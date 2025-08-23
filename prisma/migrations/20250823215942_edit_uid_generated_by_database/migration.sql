/*
  Warnings:

  - The primary key for the `historical_period` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - The primary key for the `user_reward_box` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user_reward_box` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "public"."user_email_key";

-- AlterTable
ALTER TABLE "public"."historical_period" DROP CONSTRAINT "historical_period_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "public"."user_reward_box" DROP CONSTRAINT "user_reward_box_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "user_reward_box_pkey" PRIMARY KEY ("id");
