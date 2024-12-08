/*
  Warnings:

  - A unique constraint covering the columns `[github_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[google_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebook_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
/*ALTER TABLE `User` ADD COLUMN `facebook_id` INTEGER NULL,
    ADD COLUMN `github_id` INTEGER NULL,
    ADD COLUMN `google_id` INTEGER NULL,
    ADD COLUMN `hashed_password` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_github_id_key` ON `User`(`github_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_google_id_key` ON `User`(`google_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_facebook_id_key` ON `User`(`facebook_id`);
*/