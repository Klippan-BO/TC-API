const { v4: uuid } = require('uuid');
const db = require('../db');

module.exports = {
  getUserById: (userId) => {
    // this method should: check if the requesting user has the same email address as the userId
    // they are requesting
    const query = `
      SELECT * FROM users WHERE id = $1`; // This query needs work
    return db.query(query, [userId])
      .then(({ rows }) => {
        console.log('[model] user:', rows[0]);
        return rows[0];
      })
      .catch((err) => {
        console.log('[model] Error getting user', err);
      });
  },
  login: (user) => {
    // if no cookie -> search db by email -> generate new cookie -> send it back
    const sessionId = uuid();
    const query = `
      INSERT INTO users (email, session_id)
      VALUES ($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET session_id = $2
      RETURNING id`;
    return db.query(query, [user.email, sessionId])
      .then(({ rows }) => {
        console.log('[model] created new session for user:', rows[0], sessionId);
        return [rows[0], sessionId];
      })
      .catch((err) => {
        console.log('[model] error with login user:', err);
      });
  },
};

/*
POST user object:
user = {
  email,
  username,
  profile_image,
  bio,
  accessToken,
}
*/
