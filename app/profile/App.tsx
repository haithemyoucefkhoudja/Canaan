import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { UserProfile, Achievement, UserAchievement, UserChallengeProgress, GameResult } from './types';
import { api } from './services/geminiService';
import { SettingsIcon, icons } from './components/icons';

// -- UI COMPONENTS (inspired by shadcn/ui) --

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-card border border-border rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-border ${className}`}>{children}</div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'icon';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'default', size = 'default', className = '', disabled }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    icon: 'h-10 w-10',
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

const Progress: React.FC<{ value: number; className?: string }> = ({ value, className = '' }) => (
  <div className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
    <div className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </div>
);

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-md bg-secondary ${className}`} />
);

const Dialog: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode; }> = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in" onClick={onClose}>
            <div className="relative bg-card rounded-lg border border-border shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                {children}
                <Button onClick={onClose} variant="secondary" className="mt-4 w-full">Close</Button>
            </div>
        </div>
    );
};

// -- SECTION COMPONENTS --

const ProfileHeader: React.FC<{ user: UserProfile['user']; stats: UserProfile['stats']; levelInfo: UserProfile['level_info'] }> = ({ user, stats, levelInfo }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [displayName, setDisplayName] = useState(user.display_name);

    const timePlayed = Math.round(stats.total_games_played * (350 / 60)); // Mock calculation

    return (
        <>
            <Card className="w-full mb-6 animate-slide-in">
                <CardContent className="flex flex-col sm:flex-row items-center gap-6">
                    <img src={user.photo_url} alt={displayName} className="w-24 h-24 rounded-full border-4 border-primary" />
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-3xl font-bold">{displayName}</h1>
                        <p className="text-muted-foreground">Level {levelInfo.level}</p>
                        <div className="mt-2 flex items-center gap-2">
                            <Progress value={levelInfo.progress_percentage} className="w-full" />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{user.xp}/{levelInfo.xp_for_next_level} XP</span>
                        </div>
                    </div>
                    <Button onClick={() => setIsSettingsOpen(true)} variant="secondary" size="icon">
                        <SettingsIcon className="w-5 h-5" />
                    </Button>
                </CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border-t border-border">
                    <div className="bg-card p-4 text-center"><p className="text-xl font-bold">{timePlayed}h</p><p className="text-xs text-muted-foreground">Time Played</p></div>
                    <div className="bg-card p-4 text-center"><p className="text-xl font-bold">{stats.total_games_played}</p><p className="text-xs text-muted-foreground">Games Played</p></div>
                    <div className="bg-card p-4 text-center"><p className="text-xl font-bold">{stats.total_games_played > 0 ? ((stats.total_wins / stats.total_games_played) * 100).toFixed(1) : 0}%</p><p className="text-xs text-muted-foreground">Win Rate</p></div>
                    <div className="bg-card p-4 text-center"><p className="text-xl font-bold">{stats.longest_win_streak}</p><p className="text-xs text-muted-foreground">Best Streak</p></div>
                </div>
            </Card>
            <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Settings">
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-muted-foreground mb-1">Display Name</label>
                    <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground" />
                    <Button onClick={() => setIsSettingsOpen(false)} className="mt-4">Save</Button>
                </div>
            </Dialog>
        </>
    );
};

const AchievementsSection: React.FC<{ achievements: UserProfile['achievements'] }> = ({ achievements }) => {
    const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
    
    type DisplayAchievement = Achievement & { unlocked_at?: string };

    const AchievementIcon = ({ name }: { name: string }) => {
        const IconComponent = icons[name];
        return IconComponent ? <IconComponent className="w-8 h-8 text-primary" /> : null;
    };

    const filteredAchievements = useMemo(() => {
        const all: DisplayAchievement[] = [...achievements.unlocked.map(ua => ({ ...ua.achievement, unlocked_at: ua.unlocked_at })), ...achievements.locked];
        if (filter === 'unlocked') return all.filter(a => a.unlocked_at);
        if (filter === 'locked') return all.filter(a => !a.unlocked_at);
        return all;
    }, [filter, achievements]);

    return (
        <Card className="animate-slide-in">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Achievements</h2>
                    <div className="flex items-center gap-2">
                        <Button variant={filter === 'all' ? 'default' : 'secondary'} size="sm" onClick={() => setFilter('all')}>All</Button>
                        <Button variant={filter === 'unlocked' ? 'default' : 'secondary'} size="sm" onClick={() => setFilter('unlocked')}>Unlocked</Button>
                        <Button variant={filter === 'locked' ? 'default' : 'secondary'} size="sm" onClick={() => setFilter('locked')}>Locked</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAchievements.map(ach => (
                        <div key={ach.id} className={`p-4 rounded-lg flex items-center gap-4 border ${ach.unlocked_at ? 'bg-secondary/50 border-border' : 'bg-transparent border-dashed border-border opacity-50'}`}>
                            <div className={`p-2 rounded-md ${ach.unlocked_at ? 'bg-primary/20' : 'bg-secondary'}`}>
                                <AchievementIcon name={ach.icon} />
                            </div>
                            <div>
                                <h3 className="font-semibold">{ach.name}</h3>
                                <p className="text-xs text-muted-foreground">{ach.description}</p>
                                {ach.unlocked_at && <p className="text-xs text-primary/70 mt-1">Unlocked: {new Date(ach.unlocked_at).toLocaleDateString()}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const ChallengesSection: React.FC<{ challenges: UserChallengeProgress[] }> = ({ challenges }) => {
    const ChallengeIcon = ({ name }: { name: string }) => {
        const IconComponent = icons[name];
        return IconComponent ? <IconComponent className="w-6 h-6 text-primary" /> : null;
    };
    
    return (
        <Card className="animate-slide-in">
             <CardHeader><h2 className="text-xl font-semibold">Active Challenges</h2></CardHeader>
             <CardContent className="space-y-4">
                {challenges.map(c => (
                    <div key={c.challenge.id} className="p-4 rounded-lg border border-border bg-secondary/30">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{c.challenge.name}</h3>
                            <ChallengeIcon name={c.challenge.reward_icon} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{c.challenge.description}</p>
                        <div className="flex items-center gap-3">
                            <Progress value={(c.progress / c.challenge.target) * 100} />
                            <span className="text-sm font-mono text-muted-foreground">{c.progress}/{c.challenge.target}</span>
                        </div>
                         {c.is_completed && <p className="text-xs text-green-400 mt-2 font-semibold">Completed!</p>}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const GameHistorySection: React.FC<{ games: GameResult[] }> = ({ games }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 5;
    const totalPages = Math.ceil(games.length / gamesPerPage);
    const paginatedGames = games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage);

    return (
        <Card className="animate-slide-in">
            <CardHeader><h2 className="text-xl font-semibold">Game History</h2></CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {paginatedGames.map(game => (
                        <div key={game.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                           <div className="flex items-center gap-3">
                             <div className={`w-2 h-8 rounded-full ${game.is_win ? 'bg-green-500' : 'bg-red-500'}`}></div>
                             <div>
                               <p className="font-semibold">{game.game_type} - Level {game.level}</p>
                               <p className="text-xs text-muted-foreground">{new Date(game.played_at).toLocaleString()}</p>
                             </div>
                           </div>
                           <div className="text-right">
                             <p className="font-bold">{game.final_points} pts</p>
                             <p className="text-xs text-muted-foreground">{(game.time_spent / 60).toFixed(1)} min</p>
                           </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            {totalPages > 1 && (
                <div className="p-4 border-t border-border flex justify-between items-center">
                    <Button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} variant="secondary">Previous</Button>
                    <p className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</p>
                    <Button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} variant="secondary">Next</Button>
                </div>
            )}
        </Card>
    );
};

const ProfilePageSkeleton: React.FC = () => (
    <>
        <Card className="w-full mb-6">
            <CardContent className="flex flex-col sm:flex-row items-center gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="flex-1 w-full">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-2 w-full mt-3" />
                </div>
                <Skeleton className="h-10 w-10" />
            </CardContent>
            <div className="grid grid-cols-4 gap-px bg-border border-t border-border">
                <Skeleton className="h-16 rounded-none" /><Skeleton className="h-16 rounded-none" /><Skeleton className="h-16 rounded-none" /><Skeleton className="h-16 rounded-none" />
            </div>
        </Card>
        <div className="flex items-center gap-2 border-b border-border mb-6">
             <Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-24" />
        </div>
        <Card>
            <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </CardContent>
        </Card>
    </>
);


// -- MAIN APP COMPONENT --

const App: React.FC = () => {
    const { data: profileData, isLoading, isError, error } = useQuery<UserProfile, Error>({
        queryKey: ['userProfile'],
        queryFn: () => api.fetchUserProfile(),
        retry: false, // Optional: disable retries for this demo
    });
    
    const [activeTab, setActiveTab] = useState<'achievements' | 'challenges' | 'history'>('achievements');

    const renderContent = () => {
        if (isLoading) return <ProfilePageSkeleton />;

        if (isError || !profileData) {
          return (
            <Card>
              <CardHeader><h2 className="text-xl font-semibold text-destructive">Error Loading Profile</h2></CardHeader>
              <CardContent>
                <p className="text-destructive-foreground">Could not fetch your gaming profile. Please ensure you have replaced the placeholder Supabase credentials in <code>services/geminiService.ts</code> with your actual project URL and anon key.</p>
                <pre className="mt-4 p-2 bg-secondary text-destructive-foreground/80 rounded-md text-xs whitespace-pre-wrap">
                  {error?.message || 'An unknown error occurred.'}
                </pre>
              </CardContent>
            </Card>
          );
        }

        return (
            <>
                <ProfileHeader user={profileData.user} stats={profileData.stats} levelInfo={profileData.level_info} />
                 <div className="mb-6">
                    <div className="border-b border-border">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('achievements')} className={`${activeTab === 'achievements' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Achievements</button>
                            <button onClick={() => setActiveTab('challenges')} className={`${activeTab === 'challenges' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Challenges</button>
                            <button onClick={() => setActiveTab('history')} className={`${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Game History</button>
                        </nav>
                    </div>
                </div>
                {activeTab === 'achievements' && <AchievementsSection achievements={profileData.achievements} />}
                {activeTab === 'challenges' && <ChallengesSection challenges={profileData.challenges} />}
                {activeTab === 'history' && <GameHistorySection games={profileData.game_history} />}
            </>
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <main className="w-full max-w-4xl">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;