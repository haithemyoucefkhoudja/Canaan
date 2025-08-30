// app/games/map/lobby/page.tsx

import Link from 'next/link';

export default function MultiplayerLobbyPage() {
  // In the future, this page will have a list of games or a "Find Match" button.
  // For now, it will just link directly to a test game room.
  const testGameId = "123";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Multiplayer Lobby</h1>
      <p className="text-gray-600 my-4">Join a game and compete with others!</p>
      <Link href={`/games/map/${testGameId}`}>
        <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg">
          Join Test Game
        </button>
      </Link>
    </div>
  );
}