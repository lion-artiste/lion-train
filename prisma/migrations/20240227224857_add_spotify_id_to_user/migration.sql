/*
  Warnings:

  - You are about to drop the column `facebook_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spotify_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
/*DROP INDEX `User_facebook_id_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `facebook_id`,
    ADD COLUMN `spotify_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_spotify_id_key` ON `User`(`spotify_id`);*/
