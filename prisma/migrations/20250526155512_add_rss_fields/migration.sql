-- CreateTable
CREATE TABLE "YtRSS" (
    "id" SERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "YtRSS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsRSS" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NewsRSS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WpRSS" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WpRSS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YtRSS_userId_channelId_key" ON "YtRSS"("userId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsRSS_userId_url_key" ON "NewsRSS"("userId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "WpRSS_userId_url_key" ON "WpRSS"("userId", "url");

-- AddForeignKey
ALTER TABLE "YtRSS" ADD CONSTRAINT "YtRSS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsRSS" ADD CONSTRAINT "NewsRSS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WpRSS" ADD CONSTRAINT "WpRSS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
