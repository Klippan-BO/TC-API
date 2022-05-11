const db = require('../db');

const checkCurrentFriendship = (userId, friendId) => {
  // First -> Need to check friends status
  const q1 = `
    SELECT id, user_id, friend_id, status
    FROM friends
    WHERE (user_id = $1 AND friend_id = $2)
    OR (friend_id = $1 AND user_id = $2)`;
  return db.query(q1, [userId, friendId])
    .then((result) => {
      if (result.rowCount === 0) {
        return 'none';
      }
      return result.rows[0].status;
    })
    .catch((err) => {
      console.log('[model] error checking friend status:', err);
    });
};

module.exports.sendFriendRequest = (userId, friendId) => {
  // First -> Need to check friends status
  checkCurrentFriendship(userId, friendId)
    .then((status) => {
      if (status === 'none') {
        // send request
        // return request id
      }
      if (status === 'blocked') {
        // return failure -> blocked
      }
      if (status === 'pending') {
        // return failure -> request pending
      }
    })
    .catch((err) => {
      console.log('[model] failed to send friend request:', err);
      throw err;
    });
  // INSERT INTO friends (user_id, friend_id, status)`;
};

/*
SELECT id, user_id, friend_id, status
FROM friends
WHERE (user_id = $1 AND friend_id = $2)
OR (friend_id = $1 AND user_id = $2)`
*/
