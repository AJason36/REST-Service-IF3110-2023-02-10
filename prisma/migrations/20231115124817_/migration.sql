/*
  Warnings:

  - A unique constraint covering the columns `[created_by]` on the table `book_collection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `book_collection_created_by_key` ON `book_collection`(`created_by`);
