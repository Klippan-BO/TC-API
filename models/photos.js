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
        // console.log('[model] Error upvoting photo', err);
      });
  },
  insertPhoto: (photo) => {
    console.log(photo, 'in the query');
    const query = `
      INSERT INTO photos (user_id, trail_id, username, url, thumb)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const {
      user_id, trail_id, username, url, thumb,
    } = photo;
    const photoValues = [user_id, trail_id, username, url, thumb];

    console.log(query, photoValues);
    return db.query(query, photoValues);
    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  },

  getPhotos: (trail_id) => {
    const query = `Select * from photos p where p.trail_id = ${trail_id};`;
    return db.query(query);
  },
};
