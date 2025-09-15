// types.ts

// Base User and Stats
export interface User {
  id: string;
  display_name: string;
  email: string;
  photo_url: string;
  xp: number;
}

export interface UserGameStats {
  total_games_played: number;
  total_wins: number;

  best_score: number;
  total_score: number;
  longest_win_streak: number;
}

// Achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_bonus: number;
}

export interface UserAchievement {
  unlocked_at: string;
  achievement: Achievement;
}

// Challenges
export interface Challenge {
  id: string;
  name: string;
  description: string;
  target: number;
  reward_icon: string;
}

export interface UserChallengeProgress {
  progress: number;
  is_completed: boolean;
  challenge: Challenge;
}

// Game History
export interface GameResult {
  id: string;
  game_type: string;
  level: number;
  final_points: number;
  time_spent: number; // in seconds
  is_win: boolean;
  played_at: string;
}

// The comprehensive user profile data structure
export interface UserProfile {
  user: User;
  stats: UserGameStats;
  achievements: {
    unlocked: UserAchievement[];
    locked: Achievement[];
  };
  challenges: UserChallengeProgress[];
  game_history: GameResult[];
  level_info: {
    level: number;
    xp_for_next_level: number;
    progress_percentage: number;
  };
}

// FIX: Add missing types for Event and Quiz features
export interface AppEvent {
  name: string;
  start_date: Date | null;
  end_date: Date | null;
  location: { name: string };
  description: string;
  actors: { name: string; role: string }[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}
