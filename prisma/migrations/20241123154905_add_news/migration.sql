-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sent` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `authorId` VARCHAR(191) NULL,

    UNIQUE INDEX `News_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
