/*
  Warnings:

  - Added the required column `vote_status` to the `tbl_admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_admin` ADD COLUMN `vote_status` BOOLEAN NOT NULL;
