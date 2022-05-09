const db = require('../db');

const createNewUser = (user) => {
  // Alter later to include bio, profile-pic
  const query = 'INSERT INTO users (email) VALUES ($1) RETURNING id';
  return db.query(query, [user.email])
    .then(({ rows }) => {
      console.log('[model] created new user:', user, rows[0]);
      return rows[0];
    });
};

module.exports = {
  getUserById: (userId) => {
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
    const query = 'SELECT id FROM users WHERE email = $1';
    return db.query(query, [user.email])
      .then((result) => {
        if (result.rowCount === 0) {
          // Register new user and return user_id
          console.log('[model] creating new user');
          return createNewUser(user); // returns id of newly created user
        }
        // Return the user_id
        console.log('[model] found user:', result.rows[0]);
        return result.rows[0];
      })
      .catch((err) => {
        console.log('[model] Error login getting user:', err);
      });
  },
};
