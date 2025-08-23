/*
  Warnings:

  - The primary key for the `achievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `achievement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `achievement_reward_box` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `daily_reward` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `daily_reward` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `daily_reward_content_box` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `game_result` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `game_result` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reward` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `reward` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reward_box` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `reward_box` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reward_box_reward` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_verified` on the `user` table. All the data in the column will be lost.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_achievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_challenge_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_daily_reward` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_game_stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user_game_stats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `historical_period` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `achievement_id` on the `achievement_reward_box` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `box_id` on the `achievement_reward_box` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reward_id` on the `challenge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `daily_reward_id` on the `daily_reward_content_box` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `box_id` on the `daily_reward_content_box` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `game_result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `box_id` on the `reward_box_reward` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reward_id` on the `reward_box_reward` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_id` on the `user_achievement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `achievement_id` on the `user_achievement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `user_challenge_progress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `challenge_id` on the `user_challenge_progress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `user_daily_reward` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `daily_reward_id` on the `user_daily_reward` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `user_game_stats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `user_reward_box` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `box_id` on the `user_reward_box` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."achievement_reward_box" DROP CONSTRAINT "achievement_reward_box_achievement_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."achievement_reward_box" DROP CONSTRAINT "achievement_reward_box_box_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."challenge" DROP CONSTRAINT "challenge_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."daily_reward_content_box" DROP CONSTRAINT "daily_reward_content_box_box_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."daily_reward_content_box" DROP CONSTRAINT "daily_reward_content_box_daily_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."game_result" DROP CONSTRAINT "game_result_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."reward_box_reward" DROP CONSTRAINT "reward_box_reward_box_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."reward_box_reward" DROP CONSTRAINT "reward_box_reward_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_achievement" DROP CONSTRAINT "user_achievement_achievement_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_achievement" DROP CONSTRAINT "user_achievement_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_challenge_progress" DROP CONSTRAINT "user_challenge_progress_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_challenge_progress" DROP CONSTRAINT "user_challenge_progress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_daily_reward" DROP CONSTRAINT "user_daily_reward_daily_reward_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_daily_reward" DROP CONSTRAINT "user_daily_reward_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_game_stats" DROP CONSTRAINT "user_game_stats_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_reward_box" DROP CONSTRAINT "user_reward_box_box_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_reward_box" DROP CONSTRAINT "user_reward_box_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."achievement" DROP CONSTRAINT "achievement_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "achievement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."achievement_reward_box" DROP CONSTRAINT "achievement_reward_box_pkey",
DROP COLUMN "achievement_id",
ADD COLUMN     "achievement_id" UUID NOT NULL,
DROP COLUMN "box_id",
ADD COLUMN     "box_id" UUID NOT NULL,
ADD CONSTRAINT "achievement_reward_box_pkey" PRIMARY KEY ("achievement_id", "box_id");

-- AlterTable
ALTER TABLE "public"."challenge" DROP CONSTRAINT "challenge_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "reward_id",
ADD COLUMN     "reward_id" UUID NOT NULL,
ADD CONSTRAINT "challenge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."daily_reward" DROP CONSTRAINT "daily_reward_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "daily_reward_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."daily_reward_content_box" DROP CONSTRAINT "daily_reward_content_box_pkey",
DROP COLUMN "daily_reward_id",
ADD COLUMN     "daily_reward_id" UUID NOT NULL,
DROP COLUMN "box_id",
ADD COLUMN     "box_id" UUID NOT NULL,
ADD CONSTRAINT "daily_reward_content_box_pkey" PRIMARY KEY ("daily_reward_id", "box_id");

-- AlterTable
ALTER TABLE "public"."game_result" DROP CONSTRAINT "game_result_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "game_result_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."reward" DROP CONSTRAINT "reward_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "reward_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."reward_box" DROP CONSTRAINT "reward_box_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "reward_box_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."reward_box_reward" DROP CONSTRAINT "reward_box_reward_pkey",
DROP COLUMN "box_id",
ADD COLUMN     "box_id" UUID NOT NULL,
DROP COLUMN "reward_id",
ADD COLUMN     "reward_id" UUID NOT NULL,
ADD CONSTRAINT "reward_box_reward_pkey" PRIMARY KEY ("box_id", "reward_id");

-- AlterTable
ALTER TABLE "public"."user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "email_verified",
ADD COLUMN     "email" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."user_achievement" DROP CONSTRAINT "user_achievement_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "achievement_id",
ADD COLUMN     "achievement_id" UUID NOT NULL,
ADD CONSTRAINT "user_achievement_pkey" PRIMARY KEY ("user_id", "achievement_id");

-- AlterTable
ALTER TABLE "public"."user_challenge_progress" DROP CONSTRAINT "user_challenge_progress_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "challenge_id",
ADD COLUMN     "challenge_id" UUID NOT NULL,
ADD CONSTRAINT "user_challenge_progress_pkey" PRIMARY KEY ("user_id", "challenge_id");

-- AlterTable
ALTER TABLE "public"."user_daily_reward" DROP CONSTRAINT "user_daily_reward_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "daily_reward_id",
ADD COLUMN     "daily_reward_id" UUID NOT NULL,
ADD CONSTRAINT "user_daily_reward_pkey" PRIMARY KEY ("user_id", "daily_reward_id", "date");

-- AlterTable
ALTER TABLE "public"."user_game_stats" DROP CONSTRAINT "user_game_stats_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "user_game_stats_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."user_reward_box" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
DROP COLUMN "box_id",
ADD COLUMN     "box_id" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."historical_period";

-- CreateIndex
CREATE INDEX "achievement_reward_box_achievement_id_idx" ON "public"."achievement_reward_box"("achievement_id");

-- CreateIndex
CREATE INDEX "achievement_reward_box_box_id_idx" ON "public"."achievement_reward_box"("box_id");

-- CreateIndex
CREATE INDEX "game_result_user_id_idx" ON "public"."game_result"("user_id");

-- CreateIndex
CREATE INDEX "reward_box_reward_box_id_idx" ON "public"."reward_box_reward"("box_id");

-- CreateIndex
CREATE INDEX "reward_box_reward_reward_id_idx" ON "public"."reward_box_reward"("reward_id");

-- CreateIndex
CREATE INDEX "user_challenge_progress_challenge_id_idx" ON "public"."user_challenge_progress"("challenge_id");

-- CreateIndex
CREATE INDEX "user_game_stats_user_id_idx" ON "public"."user_game_stats"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_game_stats_user_id_game_type_key" ON "public"."user_game_stats"("user_id", "game_type");

-- CreateIndex
CREATE INDEX "user_reward_box_user_id_idx" ON "public"."user_reward_box"("user_id");

-- CreateIndex
CREATE INDEX "user_reward_box_box_id_idx" ON "public"."user_reward_box"("box_id");

-- AddForeignKey
ALTER TABLE "public"."user_game_stats" ADD CONSTRAINT "user_game_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achievement_reward_box" ADD CONSTRAINT "achievement_reward_box_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achievement_reward_box" ADD CONSTRAINT "achievement_reward_box_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "public"."reward_box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reward_box_reward" ADD CONSTRAINT "reward_box_reward_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "public"."reward_box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reward_box_reward" ADD CONSTRAINT "reward_box_reward_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "public"."reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_achievement" ADD CONSTRAINT "user_achievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_achievement" ADD CONSTRAINT "user_achievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."game_result" ADD CONSTRAINT "game_result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."challenge" ADD CONSTRAINT "challenge_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "public"."achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_challenge_progress" ADD CONSTRAINT "user_challenge_progress_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_challenge_progress" ADD CONSTRAINT "user_challenge_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."daily_reward_content_box" ADD CONSTRAINT "daily_reward_content_box_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "public"."reward_box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."daily_reward_content_box" ADD CONSTRAINT "daily_reward_content_box_daily_reward_id_fkey" FOREIGN KEY ("daily_reward_id") REFERENCES "public"."daily_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_daily_reward" ADD CONSTRAINT "user_daily_reward_daily_reward_id_fkey" FOREIGN KEY ("daily_reward_id") REFERENCES "public"."daily_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_daily_reward" ADD CONSTRAINT "user_daily_reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_reward_box" ADD CONSTRAINT "user_reward_box_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "public"."reward_box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_reward_box" ADD CONSTRAINT "user_reward_box_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
