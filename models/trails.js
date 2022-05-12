const db = require('../db');

module.exports.createTrail = (trail) => {
  const {
    name,
    lat,
    lng,
    city,
    length,
    elevation,
    shortDescription,
    description,
    googleUrl,
  } = trail;
  const query = `
    INSERT INTO trail (name, lat, lng, city, length, elevation, short_description, description, google_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`;
  db.query(query, [name, lat, lng, city, length,
    elevation, shortDescription, description, googleUrl])
    .then(({ rows }) => rows[0])
    .catch((err) => {
      console.log('\n[model] error adding trail\n');
      throw err;
    });
};

module.exports.getTrailById = (trailId) => {
  const query = `
    SELECT id, name, description, length, lat, lng, elevation, google_url, short_description
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
        WHERE trail_id = t.id) AS photo
      ) AS photos,
      (SELECT json_agg(comment)
      FROM (
        SELECT body, username, timestamp, id
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
};

module.exports.getTrailsInBounds = (coordinates) => {
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
      SELECT score, thumb, id, url, timestamp
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
};
