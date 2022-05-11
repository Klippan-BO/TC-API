const db = require('../db');

module.exports = {
  upvotePhoto: (id) => {
    const query = `
      UPDATE photos
      SET score = score + 1
      WHERE photos.id = ${id};
    `;
    return db.query(query)
      .catch((err) => {
        console.log('[model] Error upvoting photo', err);
      });
  },
};
