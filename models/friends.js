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
      const { status } = rows[0];
      return status;
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
);

module.exports.reject = (friendshipId) => {
  const query = `
    DELETE FROM friends
    WHERE id = $1
    RETURNING *`;
  return db.query(query, [friendshipId])
    .then(({ rows }) => rows[0]);
};

module.exports.getFriendsByUserId = (userId) => {
  const query = `
    SELECT u.id AS user_id,
      (SELECT json_agg(friend)
      FROM (
          SELECT uf.id AS friendship_id, uf.user_id, uf.friend_id, f.username, f.bio, f.profile_image, uf.timestamp
          FROM friends_list uf JOIN users f
            ON (uf.user_id = u.id AND uf.friend_id = f.id)
            ) AS friend
        ) AS friends,
      (SELECT json_agg(request)
      FROM (
        SELECT uf.id AS friendship_id, uf.user_id, uf.friend_id, f.username, f.bio, f.profile_image, uf.timestamp
        FROM friend_requests uf JOIN users f
        ON (uf.friend_id = u.id AND uf.user_id = f.id)
        ) AS request
      ) AS friend_requests
    FROM users AS u
    WHERE u.id = $1`;
  return db.query(query, [userId])
    .then(({ rows }) => {
      const friendsList = rows[0];
      console.log('[model] received friend info:', friendsList);
      return friendsList;
    });
};
