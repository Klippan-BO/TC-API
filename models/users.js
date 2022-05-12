const { v4: uuid } = require('uuid');
const db = require('../db');

const login = (user) => {
  // if no cookie -> search db by email -> generate new cookie -> send it back
  if (!user.email) {
    throw new Error('[TC-API] No email address provided!');
  }

  const q1 = 'SELECT id FROM users WHERE email = $1';
  return db.query(q1, [user.email])
    .then((result) => {
      console.log('[model] searching for users by email found:', result.rows[0]);
      if (result.rowCount === 0) {
        throw new Error('[TC-API] User not found');
      }
      const sessionId = uuid();
      const q2 = `
        UPDATE users
        SET session_id = $1
        WHERE email = $2
        RETURNING id, email, session_id`;
      return db.query(q2, [sessionId, user.email])
        // eslint-disable-next-line no-shadow
        .then(({ rows }) => {
          const userSession = rows[0];
          console.log('[model] created new session for user:', userSession);
          return userSession;
        });
    })
    .catch((err) => {
      console.log('[model] Error with login/session making:', err);
      throw err;
    });
};

const signup = (user) => {
  // validateUser(user); // to validate user object first?
  const {
    email,
    username,
    photo,
    bio,
  } = user;
  const q1 = 'SELECT id, email, session_id FROM users WHERE email = $1';
  return db.query(q1, [email])
    .then((result) => {
      if (result.rowCount > 0) {
        // user already exists!
        console.log('[model] user email already exists in db. logging in. . . :', result.rows[0]);
        return login(user);
      }
      // since user doesn't exist time to create row
      const sessionId = uuid();
      const q2 = `
        INSERT INTO users (email, username, bio, profile_image, session_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, session_id`;
      return db.query(q2, [email, username, bio, photo, sessionId])
        .then(({ rows }) => {
          const userSession = rows[0];
          console.log('[model] new user created:', userSession);
          return userSession;
        });
    })
    .catch((err) => {
      console.log('[model] error on sign-up:', err);
    });
};

module.exports.login = login;

module.exports.signup = signup;

module.exports.deleteUser = (userId) => {
  const query = `
    UPDATE users
    SET username = 'deleted', email = 'deleted', bio = '', profile_image = '', session_id = ''
    WHERE id = $1
    RETURNING *`;
  return db.query(query, [userId])
    .then(({ rows }) => rows[0])
    .catch((err) => {
      console.log('[model] delete user failed:', err);
      throw err;
    });
};

module.exports.getUserProfileById = (userId) => {
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
};

module.exports.getAuthorizedUserProfile = (userId) => {
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
