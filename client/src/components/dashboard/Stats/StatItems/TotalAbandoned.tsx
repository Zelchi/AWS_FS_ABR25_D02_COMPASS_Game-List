import abandonedGames from "@/assets/imgs/abandoned.png";
import { StatsItem, Number, Image } from "@/components/dashboard/Stats/styles";

export default function TotalAbandoned({ data }: { data: number | undefined }) {
  return (
    <StatsItem>
      {data ? (
        <>
          <Number>{data}</Number>
          <Image src={abandonedGames} alt="Game console with a sad face" />
          games you dropped
        </>
      ) : (
        "Drop it, drop it, drop it..."
      )}
    </StatsItem>
  );
}
