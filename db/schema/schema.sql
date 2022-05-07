-- ---
-- Table 'trail'
--
-- ---

DROP TABLE IF EXISTS trail;

CREATE TABLE trail (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256),
  city VARCHAR(128) NULL DEFAULT NULL,
  description TEXT,
  length NUMERIC,
  elevation NUMERIC,
  lat NUMERIC,
  lng NUMERIC,
  google_url TEXT DEFAULT NULL
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  username VARCHAR(80),
  profile_image TEXT DEFAULT NULL,
  bio TEXT DEFAULT NULL
);

-- ---
-- Table 'friends'
--
-- ---

DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  friend_id INTEGER NULL DEFAULT NULL,
  timestamp DATE DEFAULT NOW()
);

CREATE INDEX ON friends (user_id);
CREATE INDEX ON friends (friend_id);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  trail_id INTEGER,
  user_id INTEGER,
  url TEXT,
  upvotes INTEGER,
  timestamp DATE DEFAULT NOW(),
  FOREIGN KEY (trail_id) REFERENCES trail,
  FOREIGN KEY (user_id) REFERENCES users
);

CREATE INDEX ON photos (trail_id);

-- ---
-- Table 'Ratings'
--
-- ---

DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  trail_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  difficulty INTEGER NULL DEFAULT NULL,
  nature INTEGER NULL DEFAULT NULL,
  beauty INTEGER NULL DEFAULT NULL,
  stars INTEGER NULL DEFAULT NULL,
  timestamp DATE DEFAULT NOW(),
  FOREIGN KEY (trail_id) REFERENCES trail,
  FOREIGN KEY (user_id) REFERENCES users
);

CREATE INDEX ON ratings (trail_id);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  trail_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment_body TEXT,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  reported BOOL DEFAULT false,
  timestamp DATE DEFAULT NOW(),
  FOREIGN KEY (trail_id) REFERENCES trail,
  FOREIGN KEY (user_id) REFERENCES users
);

CREATE INDEX ON comments (trail_id);