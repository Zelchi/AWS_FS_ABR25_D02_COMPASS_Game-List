import completedGames from "@/assets/imgs/completed.png";
import { StatsItem, Number, Image } from "@/components/dashboard/Stats/styles";

export default function TotalFinished({ data }: { data: number | undefined }) {
  return (
    <StatsItem>
      {data ? (
        <>
          <Number>{data}</Number>
          <Image src={completedGames} alt="Game console smiling" />
          games you finished
        </>
      ) : (
        "Wow, it seems you haven't finished any games yet..."
      )}
    </StatsItem>
  );
}
