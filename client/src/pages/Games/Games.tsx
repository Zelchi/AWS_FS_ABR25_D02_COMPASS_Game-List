import { GameProvider } from "@/contexts/gameContext";
import GamesContent from "@/components/content/GamesContent";

export default function Games() {
  return (
    <GameProvider>
      <GamesContent />
    </GameProvider>
  );
}
