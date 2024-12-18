/*
  Warnings:

  - You are about to drop the column `selecton_no` on the `tbl_selection` table. All the data in the column will be lost.
  - Added the required column `selection_no` to the `tbl_selection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_selection` DROP COLUMN `selecton_no`,
    ADD COLUMN `selection_no` INTEGER NOT NULL;
