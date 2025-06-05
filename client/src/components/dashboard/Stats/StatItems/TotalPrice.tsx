import { StatsItem, Number } from "@/components/dashboard/Stats/styles";

export default function TotalPrice({ data }: { data: number | undefined }) {
  return (
    <StatsItem>
      {data ? (
        <>
          <Number>${Math.round(data / 100)}</Number> spent on games
        </>
      ) : (
        "Stop being such a tightwad and start buying some games!"
      )}
    </StatsItem>
  );
}
