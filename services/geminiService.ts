// services/mockDataService.ts
import type { UserProfile, Achievement, UserAchievement, UserChallengeProgress, GameResult } from '../types';

const achievements: Achievement[] = [
  { id: '1', name: 'First Victory', description: 'Win your first game.', icon: 'Trophy', xp_bonus: 50 },
  { id: '2', name: 'Novice Adventurer', description: 'Reach level 5.', icon: 'Star', xp_bonus: 100 },
  { id: '3', name: 'Strategist', description: 'Win a game without any hints.', icon: 'Brain', xp_bonus: 75 },
  { id: '4', name: 'Speed Runner', description: 'Complete a game in under 5 minutes.', icon: 'Clock', xp_bonus: 100 },
  { id: '5', name: 'Century Club', description: 'Play 100 games.', icon: 'Swords', xp_bonus: 250 },
  { id: '6', name: 'Untouchable', description: 'Achieve a 5-game win streak.', icon: 'Shield', xp_bonus: 150 },
];

const unlockedAchievements: UserAchievement[] = [
  { unlocked_at: '2023-10-15', achievement: achievements[0] },
  { unlocked_at: '2023-11-01', achievement: achievements[1] },
  { unlocked_at: '2023-11-20', achievement: achievements[3] },
];
const lockedAchievementIds = new Set(unlockedAchievements.map(ua => ua.achievement.id));
const lockedAchievements = achievements.filter(a => !lockedAchievementIds.has(a.id));


const challenges: UserChallengeProgress[] = [
  {
    challenge: { id: 'c1', name: 'Daily Login', description: 'Log in 3 days in a row.', target: 3, reward_icon: 'Coin' },
    progress: 2, is_completed: false,
  },
  {
    challenge: { id: 'c2', name: 'Weekly Winner', description: 'Win 5 games this week.', target: 5, reward_icon: 'Gem' },
    progress: 5, is_completed: true,
  },
  {
    challenge: { id: 'c3', name: 'Point Hoarder', description: 'Score 10,000 points in total.', target: 10000, reward_icon: 'Chest' },
    progress: 7650, is_completed: false,
  },
];

const gameHistory: GameResult[] = [
    { id: 'g1', game_type: 'Bingo', level: 8, final_points: 1250, time_spent: 420, is_win: true, played_at: '2024-07-21T10:00:00Z' },
    { id: 'g2', game_type: 'Trivia', level: 8, final_points: 980, time_spent: 350, is_win: false, played_at: '2024-07-21T09:30:00Z' },
    { id: 'g3', game_type: 'Bingo', level: 7, final_points: 1100, time_spent: 380, is_win: true, played_at: '2024-07-20T15:00:00Z' },
    { id: 'g4', game_type: 'Puzzle', level: 7, final_points: 1500, time_spent: 600, is_win: true, played_at: '2024-07-20T14:00:00Z' },
    { id: 'g5', game_type: 'Bingo', level: 6, final_points: 800, time_spent: 300, is_win: false, played_at: '2024-07-19T11:00:00Z' },
    { id: 'g6', game_type: 'Trivia', level: 6, final_points: 1300, time_spent: 450, is_win: true, played_at: '2024-07-19T10:00:00Z' },
    { id: 'g7', game_type: 'Puzzle', level: 5, final_points: 1150, time_spent: 550, is_win: true, played_at: '2024-07-18T18:00:00Z' },
];


const calculateLevel = (xp: number) => {
    let level = 1;
    let requiredXp = 100;
    while (xp >= requiredXp) {
        xp -= requiredXp;
        level++;
        requiredXp = Math.floor(requiredXp * 1.5);
    }
    return { level, xp_for_next_level: requiredXp, progress_percentage: (xp / requiredXp) * 100, current_xp_in_level: xp };
};

const totalXp = 1250;
const levelInfo = calculateLevel(totalXp);


const mockProfile: UserProfile = {
  user: {
    id: 'user-123',
    display_name: 'CyberRonin',
    email: 'ronin@example.com',
    photo_url: `https://api.dicebear.com/8.x/bottts/svg?seed=cyberronin`,
    xp: totalXp,
  },
  stats: {
    total_games_played: 128,
    total_wins: 82,
    best_score: 2100,
    total_score: 154320,
    longest_win_streak: 9,
  },
  achievements: {
    unlocked: unlockedAchievements,
    locked: lockedAchievements,
  },
  challenges: challenges,
  game_history: gameHistory,
  level_info: {
    level: levelInfo.level,
    xp_for_next_level: levelInfo.xp_for_next_level,
    progress_percentage: levelInfo.progress_percentage
  },
};

export const mockApi = {
  fetchUserProfile: (): Promise<UserProfile> => {
    return new Promise(resolve => setTimeout(() => resolve(mockProfile), 1500));
  }
};
