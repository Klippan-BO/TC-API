COPY users (id, email, username, profile_image, bio)
  FROM 'TC-API/db/seed_data/users.csv' WITH CSV HEADER;

ALTER SEQUENCE users_id_seq RESTART WITH 101;

COPY trail (id, name, city, short_description, description, length, elevation, lat, lng, google_url)
  FROM 'TC-API/db/seed_data/trails.csv' WITH CSV HEADER;

ALTER SEQUENCE trail_id_seq RESTART WITH 101;

COPY comments (id, user_id, trail_id, body, helpfulness, reported, timestamp)
  FROM 'TC-API/db/seed_data/comments.csv' WITH CSV HEADER;

UPDATE comments
SET username = (
	SELECT username FROM users WHERE users.id = comments.user_id
);

ALTER SEQUENCE comments_id_seq RESTART WITH 101

COPY ratings (id, user_id, trail_id, difficulty, nature, beauty, stars, timestamp)
  FROM 'TC-API/db/seed_data/ratings.csv' WITH CSV HEADER;

ALTER SEQUENCE ratings_id_seq RESTART WITH 101;

COPY photos (id, user_id, trail_id, url, thumb, score, timestamp)
  FROM 'TC-API/db/seed_data/photos.csv' WITH CSV HEADER;

UPDATE photos
SET username = (
	SELECT username FROM users WHERE users.id = photos.user_id
);

COPY friends (id, user_id, friend_id, status, timestamp)
  FROM 'TC-API/db/seed_data/friends.csv' WITH CSV HEADER;

ALTER SEQUENCE friends_id_seq RESTART WITH 101;

COPY user_activity (id, user_id, trail_id, times_visited, timestamp)
  FROM 'TC-API/db/seed_data/user_activity.csv' WITH CSV HEADER;

UPDATE user_activity
SET username = (
	SELECT username FROM users WHERE users.id = user_activity.user_id
);

ALTER SEQUENCE user_activity_id_seq RESTART WITH 101;

-- remote user creation

-- CREATE USER remote WITH PASSWORD '';

-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO remote;