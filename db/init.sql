CREATE DATABASE IF NOT EXISTS rest_db;
USE rest_db;

CREATE TABLE `user` (
  `username` varchar(32) PRIMARY KEY,
  `email` varchar(320) UNIQUE,
  `password` varchar(128) NOT NULL,
  `role` ENUM ('author', 'curator') NOT NULL
);

CREATE TABLE `book_collection` (
  `collection_id` int PRIMARY KEY AUTO_INCREMENT,
  `created_by` varchar(32),
  `name` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `premium_book` (
  `book_id` integer PRIMARY KEY ,
  `created_by` varchar(32),
  `title` varchar(255) NOT NULL,
  `genre` varchar(32) NOT NULL,
  `year` year(4) NOT NULL,
  `summary` text,
  `price` integer NOT NULL,
  `duration` integer NOT NULL COMMENT 'in seconds',
  `languages` varchar(64) DEFAULT "English",
  `audio_path` text NOT NULL
);

CREATE TABLE `in_collection` (
  `collection_id` int,
  `book_id` int,
  PRIMARY KEY (`collection_id`, `book_id`)
);

ALTER TABLE `book_collection` ADD FOREIGN KEY (`created_by`) REFERENCES `user` (`username`) ON DELETE SET NULL;

ALTER TABLE `premium_book` ADD FOREIGN KEY (`created_by`) REFERENCES `user` (`username`) ON DELETE SET NULL;

ALTER TABLE `in_collection` ADD FOREIGN KEY (`collection_id`) REFERENCES `book_collection` (`collection_id`) ON DELETE CASCADE;

ALTER TABLE `in_collection` ADD FOREIGN KEY (`book_id`) REFERENCES `premium_book` (`book_id`) ON DELETE CASCADE;