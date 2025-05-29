/*
  Warnings:

  - Added the required column `image` to the `WpRSS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WpRSS" ADD COLUMN     "image" INTEGER NOT NULL;
