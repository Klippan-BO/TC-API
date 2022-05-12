/* eslint-disable camelcase */
const db = require('../db');

module.exports = {
  upvotePhoto: (id) => {
    console.log(id, 'in the query');
    const query = `
      UPDATE photos
      SET score = score + 1
      WHERE photos.id = ${id};
    `;
    return db.query(query)
      .catch((err) => {
        console.log('[model] Error upvoting photo', err);
        throw err;
      });
  },
  insertPhoto: (photo) => {
    console.log(photo, 'in the query');
    const query = `
      INSERT INTO photos (user_id, trail_id, url, thumb, username)
      SELECT $1, $2, $3, $4, u.username
      FROM users u
      WHERE u.id = $1
      RETURNING *`;
    const {
      user_id, trail_id, url, thumb,
    } = photo;
    const photoValues = [user_id, trail_id, url, thumb];
    console.log('[model] posting photo:', query, photoValues);
    return db.query(query, photoValues)
      .then(({ rows }) => {
        const newPhoto = rows[0];
        console.log('[model] new photo posted:', newPhoto);
        return newPhoto;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  getPhotos: (trail_id) => {
    const query = `Select * from photos p where p.trail_id = ${trail_id};`;
    return db.query(query);
  },
};
