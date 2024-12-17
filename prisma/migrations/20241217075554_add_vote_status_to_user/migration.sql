/*
  Warnings:

  - Added the required column `vote_status` to the `tbl_selection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_selection` ADD COLUMN `vote_status` BOOLEAN NOT NULL;
