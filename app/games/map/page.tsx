// app/games/map/page.tsx

import Link from 'next/link';
import { User, Users, Map } from 'lucide-react';

export default function GameModeSelectPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="text-center p-8">
        <div className="flex justify-center items-center mb-6">
          <Map size={48} className="text-yellow-400 mr-4" />
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Historical Journey
          </h1>
        </div>
        <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto">
          Choose your path and test your knowledge of history.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* --- Single Player Card --- */}
          <Link href="/games/map/play" className="flex-1">
            <div className="p-8 bg-gray-700/50 backdrop-blur-md rounded-2xl shadow-lg border border-gray-600 hover:bg-gray-700 hover:border-yellow-400 transition-all duration-300 h-full flex flex-col items-center">
              <User size={40} className="text-yellow-400 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Single Player</h2>
              <p className="text-gray-400">
                Complete levels, earn points, and master historical events at your own pace.
              </p>
            </div>
          </Link>

          {/* --- Multiplayer Card --- */}
          <Link href="/games/map/lobby" className="flex-1">
            <div className="p-8 bg-gray-700/50 backdrop-blur-md rounded-2xl shadow-lg border border-gray-600 hover:bg-gray-700 hover:border-yellow-400 transition-all duration-300 h-full flex flex-col items-center">
              <Users size={40} className="text-yellow-400 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Multiplayer</h2>
              <p className="text-gray-400">
                Challenge friends or other players in a real-time race against the clock.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}