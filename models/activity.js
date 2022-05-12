const db = require('../db');

module.exports.addUserActivity = (userId, trailId) => {
  const query = `
    INSERT INTO user_activity (trail_id, user_id, username)
    SELECT $1, u.id, u.username
    FROM users u
    WHERE u.id = $2
    RETURNING id, timestamp`;
  return db.query(query, [trailId, userId])
    .then(({ rows }) => {
      const userActivity = rows[0];
      console.log('[model] Added activity:', userActivity);
      return userActivity;
    })
    .catch((err) => {
      console.log('[model] Error adding user activity:', err);
    });
};
