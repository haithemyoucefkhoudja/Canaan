/*
  Warnings:

  - You are about to drop the `actor_links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `actors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_relationships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location_links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `media_assets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizzes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `source_links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
CREATE EXTENSION IF NOT EXISTS vector; -- <<< ADD THIS LINE AT THE TOP

ALTER TABLE "public"."actor_links" DROP CONSTRAINT "actor_links_actor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."actor_links" DROP CONSTRAINT "actor_links_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."documents" DROP CONSTRAINT "documents_source_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."event_relationships" DROP CONSTRAINT "event_relationships_source_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."event_relationships" DROP CONSTRAINT "event_relationships_target_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."location_links" DROP CONSTRAINT "location_links_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."location_links" DROP CONSTRAINT "location_links_location_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."media_assets" DROP CONSTRAINT "media_assets_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."quizzes" DROP CONSTRAINT "quizzes_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."source_links" DROP CONSTRAINT "source_links_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."source_links" DROP CONSTRAINT "source_links_source_id_fkey";

-- DropTable
DROP TABLE "public"."actor_links";

-- DropTable
DROP TABLE "public"."actors";

-- DropTable
DROP TABLE "public"."documents";

-- DropTable
DROP TABLE "public"."event_relationships";

-- DropTable
DROP TABLE "public"."events";

-- DropTable
DROP TABLE "public"."location_links";

-- DropTable
DROP TABLE "public"."locations";

-- DropTable
DROP TABLE "public"."media_assets";

-- DropTable
DROP TABLE "public"."quizzes";

-- DropTable
DROP TABLE "public"."source_links";

-- DropTable
DROP TABLE "public"."sources";

-- CreateTable
CREATE TABLE "public"."event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "location" TEXT,
    "coordinates" TEXT,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_relationship" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "source_event_id" UUID NOT NULL,
    "target_event_id" UUID NOT NULL,
    "relationship_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."media_asset" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" UUID NOT NULL,
    "asset_type" TEXT NOT NULL,
    "storage_url" TEXT NOT NULL,
    "title" TEXT,
    "source_text" TEXT,
    "embedding" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_id" UUID NOT NULL,
    "quiz_graph" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."actor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "actor_type" TEXT NOT NULL,
    "description" TEXT,
    "birth_date" TIMESTAMP(3),
    "death_date" TIMESTAMP(3),
    "founded_date" TIMESTAMP(3),
    "dissolved_date" TIMESTAMP(3),
    "nationality" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."actor_link" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "actor_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actor_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coordinates" TEXT,
    "country" TEXT,
    "region" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."location_link" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "location_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."source" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_date" TIMESTAMPTZ(6),
    "is_embedded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."source_link" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "source_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "relevance" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "source_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."document" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "source_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "embedding" vector(768),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_relationship_source_event_id_target_event_id_relation_key" ON "public"."event_relationship"("source_event_id", "target_event_id", "relationship_type");

-- CreateIndex
CREATE UNIQUE INDEX "actor_link_actor_id_event_id_key" ON "public"."actor_link"("actor_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_link_location_id_event_id_key" ON "public"."location_link"("location_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "source_link_source_id_event_id_key" ON "public"."source_link"("source_id", "event_id");

-- CreateIndex
CREATE INDEX "document_embedding_idx" ON "public"."document"("embedding");

-- AddForeignKey
ALTER TABLE "public"."event_relationship" ADD CONSTRAINT "event_relationship_source_event_id_fkey" FOREIGN KEY ("source_event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."event_relationship" ADD CONSTRAINT "event_relationship_target_event_id_fkey" FOREIGN KEY ("target_event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."media_asset" ADD CONSTRAINT "media_asset_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."quiz" ADD CONSTRAINT "quiz_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."actor_link" ADD CONSTRAINT "actor_link_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "public"."actor"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."actor_link" ADD CONSTRAINT "actor_link_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."location_link" ADD CONSTRAINT "location_link_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."location_link" ADD CONSTRAINT "location_link_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."source_link" ADD CONSTRAINT "source_link_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."source_link" ADD CONSTRAINT "source_link_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "public"."source"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."document" ADD CONSTRAINT "document_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "public"."source"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
