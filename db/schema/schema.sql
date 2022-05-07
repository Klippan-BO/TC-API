-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `profile_image` INTEGER NULL DEFAULT NULL,
  `short_bio` INTEGER NULL DEFAULT NULL,
  `timestamp` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'friends'
--
-- ---

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user1_id` INTEGER NULL DEFAULT NULL,
  `user2_id` INTEGER NULL DEFAULT NULL,
  `timestamp` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'trail'
--
-- ---

DROP TABLE IF EXISTS `trail`;

CREATE TABLE `trail` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `location` VARCHAR NULL DEFAULT NULL,
  `city` VARCHAR NULL DEFAULT NULL,
  `state` VARCHAR NULL DEFAULT NULL,
  `country` VARCHAR NULL DEFAULT NULL,
  `google-maps-links` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `trail_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `upvotes` INTEGER NULL DEFAULT NULL,
  `timestamp` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Ratings'
--
-- ---

DROP TABLE IF EXISTS `Ratings`;

CREATE TABLE `Ratings` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `difficulty` INTEGER NULL DEFAULT NULL,
  `shade_sunny` INTEGER NULL DEFAULT NULL,
  `resources_needed` INTEGER NULL DEFAULT NULL,
  `trail_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `timestamp` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `trail_id` INTEGER NULL DEFAULT NULL,
  `comment_body` INTEGER NULL DEFAULT NULL,
  `helpful?` INTEGER NULL DEFAULT NULL,
  `reported` INTEGER NULL DEFAULT NULL,
  `timestamp` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'events'
--
-- ---

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `trail_id` INTEGER NULL DEFAULT NULL,
  `date_of_event` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'user_events'
--
-- ---

DROP TABLE IF EXISTS `user_events`;

CREATE TABLE `user_events` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `event_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `userIsGoing?` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'replies'
--
-- ---

DROP TABLE IF EXISTS `replies`;

CREATE TABLE `replies` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `comment_id` INTEGER NULL DEFAULT NULL,
  `timestamp` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'user_trails'
--
-- ---

DROP TABLE IF EXISTS `user_trails`;

CREATE TABLE `user_trails` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `trail_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `friends` ADD FOREIGN KEY (user1_id) REFERENCES `users` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (user2_id) REFERENCES `users` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (trail_id) REFERENCES `trail` (`id`);
ALTER TABLE `photos` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `Ratings` ADD FOREIGN KEY (trail_id) REFERENCES `trail` (`id`);
ALTER TABLE `Ratings` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (trail_id) REFERENCES `trail` (`id`);
ALTER TABLE `events` ADD FOREIGN KEY (trail_id) REFERENCES `trail` (`id`);
ALTER TABLE `user_events` ADD FOREIGN KEY (event_id) REFERENCES `events` (`id`);
ALTER TABLE `user_events` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `replies` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `replies` ADD FOREIGN KEY (comment_id) REFERENCES `comments` (`id`);
ALTER TABLE `user_trails` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `user_trails` ADD FOREIGN KEY (trail_id) REFERENCES `trail` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `trail` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Ratings` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `comments` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user_events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `replies` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user_trails` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`email`,`name`,`profile_image`,`short_bio`,`timestamp`) VALUES
-- ('','','','','','');
-- INSERT INTO `friends` (`id`,`user1_id`,`user2_id`,`timestamp`) VALUES
-- ('','','','');
-- INSERT INTO `trail` (`id`,`name`,`location`,`city`,`state`,`country`,`google-maps-links`) VALUES
-- ('','','','','','','');
-- INSERT INTO `photos` (`id`,`trail_id`,`user_id`,`upvotes`,`timestamp`) VALUES
-- ('','','','','');
-- INSERT INTO `Ratings` (`id`,`difficulty`,`shade_sunny`,`resources_needed`,`trail_id`,`user_id`,`timestamp`) VALUES
-- ('','','','','','','');
-- INSERT INTO `comments` (`id`,`user_id`,`trail_id`,`comment_body`,`helpful?`,`reported`,`timestamp`) VALUES
-- ('','','','','','','');
-- INSERT INTO `events` (`id`,`trail_id`,`date_of_event`) VALUES
-- ('','','');
-- INSERT INTO `user_events` (`id`,`event_id`,`user_id`,`userIsGoing?`) VALUES
-- ('','','','');
-- INSERT INTO `replies` (`id`,`user_id`,`comment_id`,`timestamp`) VALUES
-- ('','','','');
-- INSERT INTO `user_trails` (`id`,`user_id`,`trail_id`) VALUES
-- ('','','');