/*
  Warnings:

  - Added the required column `selecton_no` to the `tbl_selection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_selection` ADD COLUMN `selecton_no` INTEGER NOT NULL;
