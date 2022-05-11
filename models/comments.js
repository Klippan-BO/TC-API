const db = require('../db');

module.exports = {
  upvoteComment: (id) => {
    const query = `
      UPDATE comments
      SET helpfulness = helpfulness + 1
      WHERE comments.id = ${id}
    `;
    return db.query(query)
      .catch((err) => {
        console.log('[model] Error upvoting comment', err);
      });
  },
};
