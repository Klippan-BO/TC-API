const db = require('../db');

module.exports = {
  getUserById: (userId) => {
    const query = `
      SELECT * FROM users WHERE id = $1`; // This query needs work
    return db.query(query, [userId])
      .then(({ rows }) => {
        console.log('[model] user:', rows[0]);
        return rows[0];
      })
      .catch((err) => {
        console.log('[model] Error getting user', err);
      });
  },
};
