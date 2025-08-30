import { MultiplayerInteractiveHistoricalMap } from "@/components/map-game/multiplayer-interactive-historical-game";

interface GamePageProps {
  params: {
    id: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const { id: gameId } = params;

  return (
    <div className="container mx-auto py-8">
      <MultiplayerInteractiveHistoricalMap gameId={gameId} />
    </div>
  );
}