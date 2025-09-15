import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { UserProfile, UserGameStats, UserAchievement, GameResult, UserChallengeProgress, Achievement } from '../types';

// IMPORTANT: Replace with your Supabase project's URL and Anon Key.
// These are safe to expose in a browser environment as long as you have Row Level Security (RLS) enabled.
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

let supabase: SupabaseClient;
const areCredentialsSet = supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

if (areCredentialsSet) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn("Supabase credentials are set to placeholder values. Please replace them in services/geminiService.ts with your actual project details to connect to the database.");
}

const calculateLevel = (xp: number) => {
    let level = 1;
    let requiredXp = 100;
    let xpForCurrentLevel = xp;
    while (xpForCurrentLevel >= requiredXp) {
        xpForCurrentLevel -= requiredXp;
        level++;
        requiredXp = Math.floor(requiredXp * 1.5);
    }
    return { level, xp_for_next_level: requiredXp, progress_percentage: (xpForCurrentLevel / requiredXp) * 100 };
};


// Mock data for challenges since the schema is commented out
const mockChallenges: UserChallengeProgress[] = [
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


const fetchUserProfileData = async (userId: string): Promise<UserProfile> => {
    // 1. Fetch User data
    const { data: user, error: userError } = await supabase
        .from('user')
        .select('id, display_name, email, photo_url, xp')
        .eq('id', userId)
        .single();
    if (userError) throw new Error(`User fetch failed: ${userError.message}`);

    // 2. Fetch User Game Stats and aggregate them
    const { data: statsData, error: statsError } = await supabase
        .from('user_game_stats')
        .select('total_games_played, total_wins, best_score, total_score, longest_win_streak')
        .eq('user_id', userId);
    if (statsError) throw new Error(`Stats fetch failed: ${statsError.message}`);
    
    const aggregatedStats: UserGameStats = statsData.reduce((acc, current) => ({
        total_games_played: acc.total_games_played + current.total_games_played,
        total_wins: acc.total_wins + current.total_wins,
        best_score: Math.max(acc.best_score, current.best_score),
        total_score: acc.total_score + current.total_score,
        longest_win_streak: Math.max(acc.longest_win_streak, current.longest_win_streak),
    }), { total_games_played: 0, total_wins: 0, best_score: 0, total_score: 0, longest_win_streak: 0 });

    // 3. Fetch Achievements (unlocked and locked)
    const { data: allAchievements, error: allAchievementsError } = await supabase
        .from('achievement')
        .select('*');
    if (allAchievementsError) throw new Error(`All achievements fetch failed: ${allAchievementsError.message}`);
    
    const { data: unlockedUserAchievements, error: unlockedError } = await supabase
        .from('user_achievement')
        .select('created_at, achievement:achievement_id(*)')
        .eq('user_id', userId);
    if (unlockedError) throw new Error(`Unlocked achievements fetch failed: ${unlockedError.message}`);

    const unlocked = (unlockedUserAchievements as any[]).map((ua): UserAchievement => ({
        unlocked_at: ua.created_at,
        achievement: ua.achievement as Achievement,
    }));

    const unlockedIds = new Set(unlocked.map(ua => ua.achievement.id));
    const locked = allAchievements.filter((a: Achievement) => !unlockedIds.has(a.id));

    // 4. Fetch Game History
    const { data: gameHistory, error: historyError } = await supabase
        .from('game_result')
        .select('*')
        .eq('user_id', userId)
        .order('played_at', { ascending: false })
        .limit(20);
    if (historyError) throw new Error(`Game history fetch failed: ${historyError.message}`);

    // 5. Calculate level info
    const levelInfo = calculateLevel(user.xp);

    return {
        user: {
            id: user.id,
            display_name: user.display_name,
            email: user.email,
            photo_url: user.photo_url || `https://api.dicebear.com/8.x/bottts/svg?seed=${user.display_name}`,
            xp: user.xp,
        },
        stats: aggregatedStats,
        achievements: { unlocked, locked },
        challenges: mockChallenges,
        game_history: gameHistory as GameResult[],
        level_info: {
            level: levelInfo.level,
            xp_for_next_level: levelInfo.xp_for_next_level,
            progress_percentage: levelInfo.progress_percentage,
        }
    };
};

export const api = {
  // In a real app, the user ID would come from an authentication context.
  // For this example, we'll use a static UUID.
  fetchUserProfile: (userId: string = '42809a74-4246-4482-921a-295b36932442'): Promise<UserProfile> => {
    if (!areCredentialsSet) {
        return Promise.reject(new Error("Supabase URL and Anon Key are not configured. Please update the placeholder values in 'services/geminiService.ts'."));
    }
    return fetchUserProfileData(userId);
  }
};