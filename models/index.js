const db = require('../db');

module.exports = {
  getTrailById: (trailId) => {
    const query = 'SELECT * FROM trail WHERE id = $1';
    return db.query(query, [trailId])
      .then(({ rows }) => {
        console.log('[model] trail:', rows[0]);
        return rows[0];
      })
      .catch((err) => {
        console.log('[model] Error getting trail', err);
      });
  },
};
