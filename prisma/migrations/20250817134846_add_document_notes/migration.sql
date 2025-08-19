/*
  Warnings:

  - You are about to drop the column `embedding_status` on the `sources` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "sources_embedding_status_idx";

-- AlterTable
ALTER TABLE "sources" DROP COLUMN "embedding_status";

-- DropEnum
DROP TYPE "embedding_status_type";
