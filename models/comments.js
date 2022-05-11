const db = require('../db');

module.exports.addComment = (comment) => {
  const { userId, trailId, body } = comment;
  const query = `
    INSERT INTO comments (user_id, trail_id, body, username)
    SELECT $1, $2, $3, u.username
    FROM users u
    WHERE u.id = $1
    RETURNING id, username, body, timestamp;`;
  return db.query(query, [userId, trailId, body])
    .then(({ rows }) => {
      const newComment = rows[0];
      console.log('[model] new comment added:', newComment);
      return newComment;
    })
    .catch((err) => {
      console.log('[model] Error adding comment:', err);
      throw err;
    });
};

module.exports.upvoteComment = (id) => {
  const query = `
    UPDATE comments
    SET helpfulness = helpfulness + 1
    WHERE comments.id = ${id}
  `;
  return db.query(query)
    .catch((err) => {
      console.log('[model] Error upvoting comment', err);
    });
};
