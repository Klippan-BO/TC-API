const db = require('../db');

module.exports = {
  getTrailById: (trailId) => {
    const query = `
      SELECT name, description, length, lat, lng, elevation, google_url,
      (SELECT row_to_json(avgs)
      FROM (
          SELECT AVG(stars)::numeric(4,2) AS average,
            AVG(beauty)::numeric(4,2) AS beauty,
            AVG(nature)::numeric(4,2) AS nature,
            AVG(difficulty)::numeric(4,2) AS difficulty
          FROM ratings WHERE trail_id = t.id) AS avgs
        ) AS ratings,
        (SELECT json_agg(photo)
        FROM (
          SELECT username, score, timestamp, url
          FROM photos
          WHERE trail_id = t.id) AS photo
        ) AS photos,
        (SELECT json_agg(comment)
        FROM (
          SELECT body, username
          FROM comments
          WHERE trail_id = t.id) AS comment
        ) AS comments
      FROM trail AS t
      WHERE t.id = $1;`;
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
