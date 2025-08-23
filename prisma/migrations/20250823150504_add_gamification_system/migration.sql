-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "photo_url" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_game_stats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_type" TEXT NOT NULL,
    "total_games_played" INTEGER NOT NULL DEFAULT 0,
    "total_wins" INTEGER NOT NULL DEFAULT 0,
    "total_losses" INTEGER NOT NULL DEFAULT 0,
    "best_score" INTEGER NOT NULL DEFAULT 0,
    "total_score" INTEGER NOT NULL DEFAULT 0,
    "average_score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fastest_time" INTEGER NOT NULL,
    "current_win_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_win_streak" INTEGER NOT NULL DEFAULT 0,
    "current_daily_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_daily_streak" INTEGER NOT NULL DEFAULT 0,
    "last_played_date" DATE,
    "hearts" INTEGER NOT NULL DEFAULT 3,
    "heart_regeneration_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_game_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "xp_bonus" INTEGER NOT NULL DEFAULT 0,
    "criteria" JSONB NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reward_box" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reward_box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."achievement_reward_box" (
    "achievement_id" TEXT NOT NULL,
    "box_id" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "achievement_reward_box_pkey" PRIMARY KEY ("achievement_id","box_id")
);

-- CreateTable
CREATE TABLE "public"."reward_box_reward" (
    "box_id" TEXT NOT NULL,
    "reward_id" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "reward_box_reward_pkey" PRIMARY KEY ("box_id","reward_id")
);

-- CreateTable
CREATE TABLE "public"."user_achievement" (
    "user_id" TEXT NOT NULL,
    "achievement_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_achievement_pkey" PRIMARY KEY ("user_id","achievement_id")
);

-- CreateTable
CREATE TABLE "public"."game_result" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_type" TEXT NOT NULL DEFAULT 'Bingo',
    "level" INTEGER NOT NULL,
    "base_points" INTEGER NOT NULL,
    "final_points" INTEGER NOT NULL,
    "time_spent" INTEGER NOT NULL,
    "correct_answers" INTEGER NOT NULL,
    "total_questions" INTEGER NOT NULL,
    "is_win" BOOLEAN NOT NULL,
    "speed_bonus" INTEGER NOT NULL DEFAULT 0,
    "first_attempt_bonus" INTEGER NOT NULL DEFAULT 0,
    "played_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."challenge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "reward_id" TEXT NOT NULL,
    "variant" TEXT NOT NULL DEFAULT 'static',
    "date" DATE,
    "start_date" DATE,
    "end_date" DATE,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_challenge_progress" (
    "user_id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "user_challenge_progress_pkey" PRIMARY KEY ("user_id","challenge_id")
);

-- CreateTable
CREATE TABLE "public"."daily_reward" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "other_rewards" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."daily_reward_content_box" (
    "daily_reward_id" TEXT NOT NULL,
    "box_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "daily_reward_content_box_pkey" PRIMARY KEY ("daily_reward_id","box_id")
);

-- CreateTable
CREATE TABLE "public"."user_daily_reward" (
    "user_id" TEXT NOT NULL,
    "daily_reward_id" TEXT NOT NULL,
    "claimed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATE NOT NULL,

    CONSTRAINT "user_daily_reward_pkey" PRIMARY KEY ("user_id","daily_reward_id","date")
);

-- CreateTable
CREATE TABLE "public"."user_reward_box" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "box_id" TEXT NOT NULL,
    "is_opened" BOOLEAN NOT NULL DEFAULT false,
    "earned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opened_at" TIMESTAMP(3),

    CONSTRAINT "user_reward_box_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE INDEX "user_game_stats_user_id_idx" ON "public"."user_game_stats"("user_id");

-- CreateIndex
CREATE INDEX "user_game_stats_game_type_idx" ON "public"."user_game_stats"("game_type");

-- CreateIndex
CREATE UNIQUE INDEX "user_game_stats_user_id_game_type_key" ON "public"."user_game_stats"("user_id", "game_type");

-- CreateIndex
CREATE UNIQUE INDEX "achievement_name_key" ON "public"."achievement"("name");

-- CreateIndex
CREATE INDEX "achievement_reward_box_achievement_id_idx" ON "public"."achievement_reward_box"("achievement_id");

-- CreateIndex
CREATE INDEX "achievement_reward_box_box_id_idx" ON "public"."achievement_reward_box"("box_id");

-- CreateIndex
CREATE INDEX "reward_box_reward_box_id_idx" ON "public"."reward_box_reward"("box_id");

-- CreateIndex
CREATE INDEX "reward_box_reward_reward_id_idx" ON "public"."reward_box_reward"("reward_id");

-- CreateIndex
CREATE INDEX "game_result_user_id_idx" ON "public"."game_result"("user_id");

-- CreateIndex
CREATE INDEX "game_result_game_type_idx" ON "public"."game_result"("game_type");

-- CreateIndex
CREATE INDEX "game_result_played_at_idx" ON "public"."game_result"("played_at");

-- CreateIndex
CREATE INDEX "challenge_date_idx" ON "public"."challenge"("date");

-- CreateIndex
CREATE INDEX "challenge_variant_idx" ON "public"."challenge"("variant");

-- CreateIndex
CREATE INDEX "challenge_start_date_end_date_idx" ON "public"."challenge"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "challenge_is_active_idx" ON "public"."challenge"("is_active");

-- CreateIndex
CREATE INDEX "user_challenge_progress_challenge_id_idx" ON "public"."user_challenge_progress"("challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_reward_day_key" ON "public"."daily_reward"("day");

-- CreateIndex
CREATE INDEX "user_reward_box_user_id_idx" ON "public"."user_reward_box"("user_id");

-- CreateIndex
CREATE INDEX "user_reward_box_box_id_idx" ON "public"."user_reward_box"("box_id");

-- CreateIndex
CREATE INDEX "user_reward_box_is_opened_idx" ON "public"."user_reward_box"("is_opened");

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
ALTER TABLE "public"."user_achievement" ADD CONSTRAINT "user_achievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_achievement" ADD CONSTRAINT "user_achievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."game_result" ADD CONSTRAINT "game_result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."challenge" ADD CONSTRAINT "challenge_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "public"."achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_challenge_progress" ADD CONSTRAINT "user_challenge_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_challenge_progress" ADD CONSTRAINT "user_challenge_progress_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."daily_reward_content_box" ADD CONSTRAINT "daily_reward_content_box_daily_reward_id_fkey" FOREIGN KEY ("daily_reward_id") REFERENCES "public"."daily_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."daily_reward_content_box" ADD CONSTRAINT "daily_reward_content_box_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "public"."reward_box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_daily_reward" ADD CONSTRAINT "user_daily_reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_daily_reward" ADD CONSTRAINT "user_daily_reward_daily_reward_id_fkey" FOREIGN KEY ("daily_reward_id") REFERENCES "public"."daily_reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_reward_box" ADD CONSTRAINT "user_reward_box_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_reward_box" ADD CONSTRAINT "user_reward_box_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "public"."reward_box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
