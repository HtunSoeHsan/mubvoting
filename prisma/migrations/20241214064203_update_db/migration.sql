/*
  Warnings:

  - You are about to drop the column `image` on the `tbl_selection` table. All the data in the column will be lost.
  - Added the required column `profile` to the `tbl_selection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `tbl_selection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_selection` DROP COLUMN `image`,
    ADD COLUMN `profile` VARCHAR(191) NOT NULL,
    ADD COLUMN `section` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `tbl_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `selection_id` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_image` ADD CONSTRAINT `tbl_image_selection_id_fkey` FOREIGN KEY (`selection_id`) REFERENCES `tbl_selection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
