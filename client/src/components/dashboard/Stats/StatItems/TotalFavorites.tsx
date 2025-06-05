import { StatsItem, HeartContainer, StyledHeartIcon } from "@/components/dashboard/Stats/styles";
import HeartIcon from "@/assets/icons/heart.svg?react";

export default function TotalFavorites({ data }: { data: number | undefined }) {
  return (
    <StatsItem>
      {data ? (
        <>
          <HeartContainer>
            {data} <StyledHeartIcon icon={HeartIcon} />
          </HeartContainer>{" "}
          games you love
        </>
      ) : (
        "My heart is broken, so is yours... no favourite games!"
      )}
    </StatsItem>
  );
}
