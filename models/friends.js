const db = require('../db');

const checkCurrentFriendship = (userId, friendId) => {
  // First -> Need to check friends status -> returns friendship for updating
  const query = `
    SELECT id, user_id, friend_id, status
    FROM friends
    WHERE (user_id = $1 AND friend_id = $2)
    OR (friend_id = $1 AND user_id = $2)`;
  return db.query(query, [userId, friendId])
    .then((result) => {
      if (result.rowCount === 0) {
        return false;
      }
      const friendship = result.rows[0];
      return friendship;
    })
    .catch((err) => {
      console.log('[model] error checking friend status:', err);
    });
};

module.exports.sendFriendRequest = (userId, friendId) => (
  checkCurrentFriendship(userId, friendId)
    .then((friendship) => {
      if (friendship.status === 'blocked') {
        throw new Error('[TC-API] user is blocked');
      }
      if (friendship.status === 'pending') {
        throw new Error('[TC-API] friend request already pending');
      }
      const query = `
      INSERT INTO friends (user_id, friend_id, status)
      VALUES ($1, $2, 'pending')
      RETURNING id, status, timestamp`;
      return db.query(query, [userId, friendId])
        .then(({ rows }) => {
          const request = rows[0];
          console.log('[model] friend request made:', request);
          return request;
        });
    })
    .catch((err) => {
      console.log('[model] failed to send friend request:', err);
      throw err;
    })
);

module.exports.acceptFriendRequest = (userId, friendId, friendshipId) => {
  const query = `
    UPDATE friends
    SET status = 'accepted'
    WHERE id = $1
    RETURNING id, status, timestamp`;
  const acceptRequest = (fid) => (
    db.query(query, [fid])
      .then(({ rows }) => {
        const friendship = rows[0];
        console.log('[model] friend request accepted:', friendship);
        return friendship;
      })
      .catch((err) => {
        console.log('[model] error updating friendship:', err);
      })
  );

  if (friendshipId) {
    return acceptRequest(friendshipId);
  }

  return checkCurrentFriendship(userId, friendId)
    .then((friendship) => {
      if (friendship === false) {
        throw new Error('[TC-API] no pending friend request');
      }
      if (friendship.status === 'blocked') {
        throw new Error('[TC-API] user is blocked');
      }
      if (friendship.status === 'accepted') {
        throw new Error('[TC-API] users already friends');
      }
      return acceptRequest(friendship.id);
    })
    .catch((err) => {
      console.log('[model] error accepting friend request', err);
      throw err;
    });
};
