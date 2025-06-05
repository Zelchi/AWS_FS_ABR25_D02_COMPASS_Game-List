import { GameProvider } from "@/contexts/gameContext";
import GamesContent from "@/pages/Games/GamesContent";

export default function Games() {
  return (
    <GameProvider>
      <GamesContent />
    </GameProvider>
  );
}
