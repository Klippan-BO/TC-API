const db = require('../db');

const checkFriendStatus = (userId, friendId) => {
  // First -> Need to check friends status -> returns friendship for updating
  // 0 -> not friends 1 -> request sent; 2 -> request received; 3 -> friends
  const query = `
    SELECT COALESCE(
      (SELECT 1
      FROM friend_requests
        WHERE (user_id = $1 AND friend_id = $2)),
      (SELECT 2
      FROM friend_requests
        WHERE (user_id = $2 AND friend_id = $1)),
      (SELECT 3
      FROM friends_list
        WHERE (user_id = $1 AND friend_id = $2))
    ) AS status`;
  return db.query(query, [userId, friendId])
    .then(({ rows }) => {
      if (!rows) {
        return 0;
      }
      const status = rows[0].status;
      return status;
    })
    .catch((err) => {
      console.log('[model] error checking friend status:', err);
    });
};

module.exports.checkFriendStatus = (userId, friendId) => (
  checkFriendStatus(userId, friendId)
    .then((status) => {
      if (status === 1) {
        return 'request sent';
      }
      if (status === 2) {
        return 'request pending';
      }
      if (status === 3) {
        return 'friends';
      }
      return null;
    })
    .catch((err) => {
      console.log('[model] Error checking friend status', err);
      throw err;
    })
);

module.exports.add = (userId, friendId) => (
  checkFriendStatus(userId, friendId)
    .then((status) => {
      if (status === 1) {
        throw new Error('[TC-API] friend request already sent');
      }
      if (status === 3) {
        throw new Error('[TC-API] users are already friends');
      }
      const query = `
      INSERT INTO friends (user_id, friend_id, status)
      VALUES ($1, $2, 'sent')
      RETURNING id, timestamp, status`;
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

module.exports.reject = (friendshipId) => {
  const query = `
    DELETE FROM friends
    WHERE id = $1
    RETURNING *`;
  return db.query(query, [friendshipId])
    .then(({ rows }) => rows[0])
    .catch((err) => {
      console.log('[model] error rejecting request', err)
      throw err;
    });
}
