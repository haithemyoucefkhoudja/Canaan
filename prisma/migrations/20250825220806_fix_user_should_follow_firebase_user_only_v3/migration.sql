/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_achievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_challenge_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_daily_reward` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."game_result" DROP CONSTRAINT "game_result_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_achievement" DROP CONSTRAINT "user_achievement_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_challenge_progress" DROP CONSTRAINT "user_challenge_progress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_daily_reward" DROP CONSTRAINT "user_daily_reward_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_game_stats" DROP CONSTRAINT "user_game_stats_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_reward_box" DROP CONSTRAINT "user_reward_box_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."game_result" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."user_achievement" DROP CONSTRAINT "user_achievement_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_achievement_pkey" PRIMARY KEY ("user_id", "achievement_id");

-- AlterTable
ALTER TABLE "public"."user_challenge_progress" DROP CONSTRAINT "user_challenge_progress_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_challenge_progress_pkey" PRIMARY KEY ("user_id", "challenge_id");

-- AlterTable
ALTER TABLE "public"."user_daily_reward" DROP CONSTRAINT "user_daily_reward_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_daily_reward_pkey" PRIMARY KEY ("user_id", "daily_reward_id", "date");

-- AlterTable
ALTER TABLE "public"."user_game_stats" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."user_reward_box" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."user_game_stats" ADD CONSTRAINT "user_game_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_achievement" ADD CONSTRAINT "user_achievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."game_result" ADD CONSTRAINT "game_result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_challenge_progress" ADD CONSTRAINT "user_challenge_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_daily_reward" ADD CONSTRAINT "user_daily_reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_reward_box" ADD CONSTRAINT "user_reward_box_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
