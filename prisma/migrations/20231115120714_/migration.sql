-- CreateTable
CREATE TABLE `book_collection` (
    `collection_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_by` VARCHAR(32) NULL,
    `desc` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`collection_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `in_collection` (
    `collection_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,

    INDEX `book_id`(`book_id`),
    PRIMARY KEY (`collection_id`, `book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `premium_book` (
    `book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_by` VARCHAR(32) NULL,
    `title` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(32) NOT NULL,
    `year` YEAR NOT NULL,
    `content` TEXT NOT NULL,
    `duration` INTEGER NOT NULL,
    `audio_path` TEXT NOT NULL,

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `username` VARCHAR(32) NOT NULL,
    `email` VARCHAR(320) NULL,
    `password` VARCHAR(128) NOT NULL,
    `full_name` VARCHAR(128) NOT NULL,
    `role` ENUM('author', 'curator') NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book_collection` ADD CONSTRAINT `book_collection_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `in_collection` ADD CONSTRAINT `in_collection_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `book_collection`(`collection_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `in_collection` ADD CONSTRAINT `in_collection_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `premium_book`(`book_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `premium_book` ADD CONSTRAINT `premium_book_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE NO ACTION;
