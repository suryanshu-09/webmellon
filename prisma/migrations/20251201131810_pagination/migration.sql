-- AlterTable
ALTER TABLE "Catalogue" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" JSONB DEFAULT '{"paginationType": "pages", "itemsPerPage": 10}';
