-- ---
-- Table 'trail'
--
-- ---

DROP TABLE IF EXISTS trail;

CREATE TABLE trail (
  id                  SERIAL PRIMARY KEY NOT NULL,
  name                VARCHAR(256),
  city                VARCHAR(128) NULL DEFAULT NULL,
  short_description   VARCHAR(256),
  description         TEXT,
  length              NUMERIC,
  elevation           NUMERIC,
  lat                 NUMERIC,
  lng                 NUMERIC,
  google_url          TEXT DEFAULT NULL
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id               SERIAL PRIMARY KEY,
  email            TEXT NOT NULL,
  username         VARCHAR(80),
  profile_image    TEXT DEFAULT NULL,
  bio              TEXT DEFAULT NULL
);

-- ---
-- Table 'user_activity'
--
-- ---

DROP TABLE IF EXISTS user_activity;

CREATE TABLE user_activity (
  id                      SERIAL PRIMARY KEY,
  user_id                 INTEGER NOT NULL,
  trail_id                INTEGER NOT NULL,
  times_visited           INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id)   REFERENCES users,
  FOREIGN KEY (trail_id)  REFERENCES trail
);

CREATE INDEX ON user_activity (user_id);
CREATE INDEX ON user_activity (trail_id);

-- ---
-- Table 'friends'
--
-- ---

DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
  id                      SERIAL PRIMARY KEY,
  user_id                 INTEGER NOT NULL,
  friend_id               INTEGER NOT NULL,
  status                  VARCHAR(16),
  timestamp               TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id)   REFERENCES users,
  FOREIGN KEY (friend_id) REFERENCES users
);

CREATE INDEX ON friends (user_id);
CREATE INDEX ON friends (friend_id);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id                      SERIAL PRIMARY KEY,
  user_id                 INTEGER,
  trail_id                INTEGER,
  username                VARCHAR(80),
  url                     TEXT,
  score                   INTEGER DEFAULT 0,
  timestamp               TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (trail_id)  REFERENCES trail,
  FOREIGN KEY (user_id)   REFERENCES users
);

CREATE INDEX ON photos (trail_id);
CREATE INDEX ON photos (user_id);

-- ---
-- Table 'Ratings'
--
-- ---

DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings (
  id                      SERIAL PRIMARY KEY,
  user_id                 INTEGER NOT NULL,
  trail_id                INTEGER NOT NULL,
  difficulty              INTEGER NULL DEFAULT NULL,
  nature                  INTEGER NULL DEFAULT NULL,
  beauty                  INTEGER NULL DEFAULT NULL,
  stars                   INTEGER NULL DEFAULT NULL,
  timestamp               TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (trail_id)  REFERENCES trail,
  FOREIGN KEY (user_id)   REFERENCES users
);

CREATE INDEX ON ratings (trail_id);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id                      SERIAL PRIMARY KEY,
  user_id                 INTEGER NOT NULL,
  trail_id                INTEGER NOT NULL,
  username                VARCHAR(80),
  body                    TEXT,
  helpfulness             INTEGER DEFAULT 0,
  reported                BOOL DEFAULT false,
  timestamp               TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (trail_id)  REFERENCES trail,
  FOREIGN KEY (user_id)   REFERENCES users
);

CREATE INDEX ON comments (trail_id);
