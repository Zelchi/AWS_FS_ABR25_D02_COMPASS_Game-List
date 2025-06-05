import playingGames from "@/assets/imgs/playing.png";
import { StatsItem, Number, Image } from "@/components/dashboard/Stats/styles";

export default function TotalPlaying({ data }: { data: number | undefined }) {
  return (
    <StatsItem>
      {data ? (
        <>
          <Number>{data}</Number>
          <Image src={playingGames} alt="Game console with tryhard face" />
          games you are playing
        </>
      ) : (
        "Don't let your money go to waste, finish your games!"
      )}
    </StatsItem>
  );
}
