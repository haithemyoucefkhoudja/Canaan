// hooks/useSession.ts
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

// This is the function that actually asks Supabase for the session
const getSession = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error('Failed to fetch session: ' + error.message);
    }

    // The 'session' object contains the user, or it's null if not logged in
    return data.session;
};

// This is our reusable React hook
export const useSession = () => {
    return useQuery({
        queryKey: ['session'], // A unique key for this query
        queryFn: getSession,   // The function to run to get the data
    });
};