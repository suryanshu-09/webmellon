-- AlterTable
ALTER TABLE "Catalogue" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Catalogue_userId_deletedAt_idx" ON "Catalogue"("userId", "deletedAt");

-- CreateIndex
CREATE INDEX "NewsRSS_userId_idx" ON "NewsRSS"("userId");

-- CreateIndex
CREATE INDEX "Website_userId_catalogueId_idx" ON "Website"("userId", "catalogueId");

-- CreateIndex
CREATE INDEX "WpRSS_userId_idx" ON "WpRSS"("userId");

-- CreateIndex
CREATE INDEX "YtRSS_userId_idx" ON "YtRSS"("userId");
