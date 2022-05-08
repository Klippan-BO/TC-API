const db = require('../db');

module.exports = {
  getTrailById: (trailId) => {
    const query = `
      SELECT name, description, length, lat,
        lng, elevation, google_url,
        (SELECT json_agg(comment)
        FROM (
          SELECT body, username, helpfulness, reported, timestamp
          FROM comments
          WHERE comments.trail_id = t.id
          ) AS comment
        ) AS comments
      FROM trail AS t
      WHERE t.id = $1`;
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
