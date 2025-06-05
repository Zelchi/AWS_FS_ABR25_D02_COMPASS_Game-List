import { StatsItem, RatingContainer as Wrapper, Rating } from "@/components/dashboard/Stats/styles";
import { theme } from "@/themes/theme";

export default function AvgRating({ data }: { data: number | undefined }) {
  return (
    <StatsItem>
      {data ? (
        <>
          <Wrapper>
            <Rating rating={data} color={theme.colors.aqua} bgColor={theme.colors.grey03} />{" "}
            {data?.toFixed(2)}
          </Wrapper>
          how you score
        </>
      ) : (
        "You should be rating more..."
      )}
    </StatsItem>
  );
}
