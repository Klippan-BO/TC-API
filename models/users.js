const { v4: uuid } = require('uuid');
const db = require('../db');

module.exports = {
  getUserProfileById: (userId) => {
    // this method should: check if the requesting user has the same email address as the userId
    // they are requesting
    const query = `
      SELECT id, username, profile_image, bio,
        (SELECT json_agg(tr)
        FROM (
          SELECT t.id, name, short_description,
            (SELECT array_agg(photo)
            FROM (
              SELECT url FROM photos
              WHERE trail_id = t.id) AS photo
            ) AS photos,
            (SELECT row_to_json(avgs)
            FROM (
              SELECT AVG(stars)::numeric(4,2) AS average,
              AVG(beauty)::numeric(4,2) AS beauty,
              AVG(nature)::numeric(4,2) AS nature,
              AVG(difficulty)::numeric(4,2) AS difficulty
              FROM ratings WHERE trail_id = t.id) AS avgs
            ) AS rating
          FROM trail t JOIN user_activity a
          ON t.id = a.trail_id AND a.user_id = u.id) AS tr
        ) AS trails
      FROM users AS u
      WHERE u.id = $1`;
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
    if (!user.email) {
      throw new Error('Must provide email address at minimum.');
    }
    const sessionId = uuid();
    const query = `
      INSERT INTO users (email, username, bio, profile_image, session_id)
      VALUES ($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET session_id = $2
      RETURNING id`;
    return db.query(query, [user.email, user.username, user.bio, user.profile_image, sessionId])
      .then(({ rows }) => {
        console.log('[model] created new session for user:', rows[0], sessionId);
        return [rows[0], sessionId];
      })
      .catch((err) => {
        console.log('[model] error with login user:', err);
      });
  },

  getAuthorizedUserProfile: (userId) => {
    const query = `
      SELECT id, username, profile_image, bio,
      (SELECT json_agg(tr)
      FROM (
        SELECT t.id, name, short_description,
        (SELECT array_agg(photo)
        FROM (
          SELECT url FROM photos
          WHERE trail_id = t.id) AS photo
        ) AS photos,
        (SELECT row_to_json(avgs)
        FROM (
          SELECT AVG(stars)::numeric(4,2) AS average,
          AVG(beauty)::numeric(4,2) AS beauty,
          AVG(nature)::numeric(4,2) AS nature,
          AVG(difficulty)::numeric(4,2) AS difficulty
          FROM ratings WHERE trail_id = t.id) AS avgs
        ) AS rating
        FROM trail t JOIN user_activity a
        ON t.id = a.trail_id AND a.user_id = u.id) AS tr
      ) AS trails,
      (SELECT json_agg(fnds)
      FROM (
        SELECT f.id, f.username, f.profile_image, uf.status
        FROM friends uf JOIN users f
        ON (uf.user_id = u.id AND uf.friend_id = f.id)
        OR (uf.friend_id = u.id AND uf.user_id = f.id)
        ) AS fnds
      ) AS friends
    FROM users AS u
    WHERE u.id = $1;`;
    return db.query(query, [userId])
      .then(({ rows }) => {
        const userProfile = rows[0];
        console.log('[model] Got full user profile:', userProfile);
        return userProfile;
      })
      .catch((err) => {
        console.log('[model] Error getting user profile:', err);
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
