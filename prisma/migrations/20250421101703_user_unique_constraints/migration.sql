/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Catalogue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,url]` on the table `Website` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Catalogue_name_key";

-- DropIndex
DROP INDEX "Website_name_key";

-- DropIndex
DROP INDEX "Website_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "Catalogue_userId_name_key" ON "Catalogue"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Website_userId_name_key" ON "Website"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Website_userId_url_key" ON "Website"("userId", "url");
