import { TStatistics } from "@/types/types";
import TotalPrice from "@/components/dashboard/Stats/StatItems/TotalPrice";
import TopPlatform from "@/components/dashboard/Stats/StatItems/TopPlatform";
import AvgRating from "@/components/dashboard/Stats/StatItems/AvgRating";
import TotalFavorites from "@/components/dashboard/Stats/StatItems/TotalFavorites";
import TotalPlaying from "@/components/dashboard/Stats/StatItems/TotalPlaying";
import TotalFinished from "@/components/dashboard/Stats/StatItems/TotalFinished";
import TotalAbandoned from "@/components/dashboard/Stats/StatItems/TotalAbandoned";
import { Container, Wrapper } from "./styles";

type StatsProps = {
  data?: TStatistics;
};

export function Stats({ data }: StatsProps) {
  const totalPrice = data?.totalPrice;
  const topPlatform = data?.topPlatform ? JSON.parse(data.topPlatform) : undefined;
  const avgRating = data?.avgRating;
  const totalFavorites = data?.totalFavorites;
  const totalPlaying = data?.totalPlaying;
  const totalDone = data?.totalDone;
  const totalAbandoned = data?.totalAbandoned;

  return (
    <Container>
      <Wrapper>
        <TotalPrice data={totalPrice} />
        <TopPlatform data={topPlatform} />
        <AvgRating data={avgRating} />
        <TotalFavorites data={totalFavorites} />
      </Wrapper>
      <Wrapper>
        <TotalPlaying data={totalPlaying} />
        <TotalFinished data={totalDone} />
        <TotalAbandoned data={totalAbandoned} />
      </Wrapper>
    </Container>
  );
}
