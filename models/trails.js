const db = require('../db');

module.exports = {
  getTrailById: (trailId) => {
    const query = `
      SELECT id, name, description, length, lat, lng, elevation, google_url,
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
          SELECT id, username, score, timestamp, url, thumb
          FROM photos
          WHERE trail_id = t.id
          ORDER BY score DESC) AS photo
        ) AS photos,
        (SELECT json_agg(comment)
        FROM (
          SELECT body, username, timestamp
          FROM comments
          WHERE trail_id = t.id
          ORDER BY timestamp DESC) AS comment
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
  getTrailsInBounds: (coordinates) => {
    const {
      swlat,
      swlng,
      nelat,
      nelng,
    } = coordinates;
    const query = `
    SELECT id, name, city, short_description, length, elevation, lat, lng,
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
        SELECT score, thumb
        FROM photos
        WHERE trail_id = t.id) AS photo
      ) AS photos
    FROM trail AS t
    WHERE lat >= $1 AND lat <= $2 AND lng >= $3 AND lng <= $4`;
    return db.query(query, [swlat, nelat, swlng, nelng])
      .then((results) => {
        console.log('[model] found in-bound trails:', results.rows);
        return results.rows;
      })
      .catch((err) => {
        console.log('[model] error getting trails in bounds:', err);
      });
  },
};
