/*
  Warnings:

  - Made the column `profile` on table `tbl_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tbl_user` MODIFY `profile` VARCHAR(191) NOT NULL;
