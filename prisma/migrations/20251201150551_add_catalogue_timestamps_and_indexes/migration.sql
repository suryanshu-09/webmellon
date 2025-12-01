-- AlterTable
ALTER TABLE "Catalogue" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "preferences" JSONB;

-- CreateIndex
CREATE INDEX "Catalogue_userId_name_idx" ON "Catalogue"("userId", "name");

-- CreateIndex
CREATE INDEX "Catalogue_userId_createdAt_idx" ON "Catalogue"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Catalogue_userId_updatedAt_idx" ON "Catalogue"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "Website_catalogueId_name_idx" ON "Website"("catalogueId", "name");
