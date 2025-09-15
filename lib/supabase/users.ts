// lib/db/users.ts
import { createClient } from '@/lib/supabase/client'
import { User } from '@prisma/client' // Assuming you've run prisma generate

const supabase = createClient()

export const getUserProfile = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error.message)
    throw error
  }

  return data
}

export const getLeaderboard = async (limit: number = 10): Promise<Pick<User, 'id' | 'display_name' | 'photo_url' | 'xp'>[]> => {
    const { data, error } = await supabase
        .from('User')
        .select('id, display_name, photo_url, xp')
        .order('xp', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching leaderboard:', error.message);
        throw error;
    }

    return data || [];
}