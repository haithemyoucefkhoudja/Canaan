/*
  Warnings:

  - The primary key for the `actor_links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `actor_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `actors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `actors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `event_relationships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `event_relationships` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `location_links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `location_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `locations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `media_assets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `media_assets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `quizzes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `quizzes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `source_links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `source_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `sources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `embedding` on the `sources` table. All the data in the column will be lost.
  - The `id` column on the `sources` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `actor_id` on the `actor_links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_id` on the `actor_links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_event_id` on the `event_relationships` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `target_event_id` on the `event_relationships` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `location_id` on the `location_links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_id` on the `location_links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_id` on the `media_assets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_id` on the `quizzes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_id` on the `source_links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_id` on the `source_links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `author` on table `sources` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `sources` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `sources` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `sources` required. This step will fail if there are existing NULL values in that column.

*/
CREATE EXTENSION IF NOT EXISTS vector; -- <<< ADD THIS LINE AT THE TOP

-- CreateEnum
CREATE TYPE "embedding_status_type" AS ENUM ('not_started', 'processing', 'completed', 'failed');

-- DropForeignKey
ALTER TABLE "actor_links" DROP CONSTRAINT "actor_links_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "actor_links" DROP CONSTRAINT "actor_links_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_relationships" DROP CONSTRAINT "event_relationships_source_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_relationships" DROP CONSTRAINT "event_relationships_target_event_id_fkey";

-- DropForeignKey
ALTER TABLE "location_links" DROP CONSTRAINT "location_links_event_id_fkey";

-- DropForeignKey
ALTER TABLE "location_links" DROP CONSTRAINT "location_links_location_id_fkey";

-- DropForeignKey
ALTER TABLE "media_assets" DROP CONSTRAINT "media_assets_event_id_fkey";

-- DropForeignKey
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_event_id_fkey";

-- DropForeignKey
ALTER TABLE "source_links" DROP CONSTRAINT "source_links_event_id_fkey";

-- DropForeignKey
ALTER TABLE "source_links" DROP CONSTRAINT "source_links_source_id_fkey";

-- AlterTable
ALTER TABLE "actor_links" DROP CONSTRAINT "actor_links_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "actor_id",
ADD COLUMN     "actor_id" UUID NOT NULL,
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
ADD CONSTRAINT "actor_links_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "actors" DROP CONSTRAINT "actors_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "actors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "event_relationships" DROP CONSTRAINT "event_relationships_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "source_event_id",
ADD COLUMN     "source_event_id" UUID NOT NULL,
DROP COLUMN "target_event_id",
ADD COLUMN     "target_event_id" UUID NOT NULL,
ADD CONSTRAINT "event_relationships_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "location_links" DROP CONSTRAINT "location_links_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "location_id",
ADD COLUMN     "location_id" UUID NOT NULL,
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
ADD CONSTRAINT "location_links_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "locations" DROP CONSTRAINT "locations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "media_assets" DROP CONSTRAINT "media_assets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
ADD CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
ADD CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "source_links" DROP CONSTRAINT "source_links_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "source_id",
ADD COLUMN     "source_id" UUID NOT NULL,
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "source_links_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sources" DROP CONSTRAINT "sources_pkey",
DROP COLUMN "embedding",
ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "embedding_status" TEXT NOT NULL DEFAULT 'not_started',
ADD COLUMN     "is_embedded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "publishDate" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "sources_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "source_id" UUID NOT NULL,
    "content" TEXT,
    "metadata" JSONB,
    "embedding" vector(1536),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "documents_embedding_idx" ON "documents"("embedding");

-- CreateIndex
CREATE UNIQUE INDEX "actor_links_actor_id_event_id_key" ON "actor_links"("actor_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_relationships_source_event_id_target_event_id_relatio_key" ON "event_relationships"("source_event_id", "target_event_id", "relationshipType");

-- CreateIndex
CREATE UNIQUE INDEX "location_links_location_id_event_id_key" ON "location_links"("location_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "source_links_source_id_event_id_key" ON "source_links"("source_id", "event_id");

-- CreateIndex
CREATE INDEX "sources_embedding_status_idx" ON "sources"("embedding_status");

-- AddForeignKey
ALTER TABLE "event_relationships" ADD CONSTRAINT "event_relationships_source_event_id_fkey" FOREIGN KEY ("source_event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_relationships" ADD CONSTRAINT "event_relationships_target_event_id_fkey" FOREIGN KEY ("target_event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "actor_links" ADD CONSTRAINT "actor_links_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "actor_links" ADD CONSTRAINT "actor_links_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_links" ADD CONSTRAINT "location_links_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_links" ADD CONSTRAINT "location_links_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "source_links" ADD CONSTRAINT "source_links_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "source_links" ADD CONSTRAINT "source_links_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
