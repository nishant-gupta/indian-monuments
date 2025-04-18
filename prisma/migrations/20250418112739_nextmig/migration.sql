-- CreateEnum
CREATE TYPE "MonumentType" AS ENUM ('HISTORICAL', 'UNESCO', 'ANCIENT', 'MEDIEVAL', 'MODERN');

-- CreateEnum
CREATE TYPE "MonumentPeriod" AS ENUM ('ANCIENT', 'MEDIEVAL', 'MODERN');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('ASIA', 'EUROPE', 'AMERICAS', 'AFRICA', 'OCEANIA');

-- AlterTable
ALTER TABLE "Monument" ADD COLUMN     "period" "MonumentPeriod",
ADD COLUMN     "popularity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "region" "Region" NOT NULL DEFAULT 'ASIA',
ADD COLUMN     "type" "MonumentType" NOT NULL DEFAULT 'HISTORICAL',
ALTER COLUMN "country" DROP DEFAULT;
