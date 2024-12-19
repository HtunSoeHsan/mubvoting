/*
  Warnings:

  - Made the column `section` on table `tbl_selection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tbl_selection` MODIFY `section` VARCHAR(191) NOT NULL;
