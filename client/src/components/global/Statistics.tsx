import { IStatistics } from "@/types/types";
import StatsItem from "@/components/global/StatsItem";
import styled from "styled-components";
import SmartImage from "@/components/global/SmartImage";
import defaultPlatformImage from "@/assets/default-platform.jpg";
import RatingSummary from "@/components/global/RatingSummary";
import Heart from "@/assets/heart.svg?react";
import completedGames from "@/assets/completed.png";
import abandonedGames from "@/assets/abandoned.png";
import playingGames from "@/assets/playing.png";

const laptopS = 67;
const tablet = 48;
const mobile = 30;

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;

  @media (max-width: ${laptopS}em) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${mobile}em) {
    gap: 1.2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;

  &:first-child {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 0.75rem));

    @media (max-width: ${laptopS}em) {
      grid-template-columns: repeat(4, calc(25% - 1.15rem));
    }

    @media (max-width: ${tablet}em) {
      grid-template-columns: repeat(2, calc(50% - 0.75rem));
    }
  }

  @media (max-width: ${mobile}em) {
    gap: 1.2rem;
  }
`;

const Number = styled.span`
  font-size: 3.5rem;
  font-weight: 700;

  @media (max-width: ${laptopS}em) {
    font-size: 2.5rem;
  }
`;

const PlatformImage = styled(SmartImage)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-bottom: 0.5rem;
`;

const RatingContainer = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 800;

  @media (max-width: ${laptopS}em) {
    font-size: 2.5rem;
  }
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 800;

  @media (max-width: ${laptopS}em) {
    font-size: 2.5rem;
  }
`;

const Rating = styled(RatingSummary)`
  width: 5rem;

  @media (max-width: ${laptopS}em) {
    width: 4rem;
  }
`;

const HeartIcon = styled(Heart)`
  width: 5.2rem;

  @media (max-width: ${laptopS}em) {
    width: 4.2rem;
  }
`;

const Image = styled.img`
  width: 120%;
`;

export function Statistics({ data }: { data: { data: IStatistics } | undefined }) {
  const gameStatsStyle = { fontSize: "5rem", marginBottom: "auto" };

  const stats = data?.data;
  const totalPrice = stats?.totalPrice;
  const topPlatform = stats?.topPlatform ? JSON.parse(stats.topPlatform) : undefined;
  const avgRating = stats?.avgRating;
  const totalFavorites = stats?.totalFavorites;
  const totalPlaying = stats?.totalPlaying;
  const totalDone = stats?.totalDone;
  const totalAbandoned = stats?.totalAbandoned;

  return (
    <Container>
      <Wrapper>
        <StatsItem>
          <Number>{totalPrice ? `$${Math.round(totalPrice / 100)}` : "$0"}</Number> spent on games
        </StatsItem>
        <StatsItem>
          {topPlatform ? (
            <>
              <PlatformImage
                src={topPlatform.imageUrl || defaultPlatformImage}
                fallback={defaultPlatformImage}
              />
              {topPlatform.name}aholic
            </>
          ) : (
            "No platforms? Not a player"
          )}
        </StatsItem>
        <StatsItem>
          {avgRating ? (
            <>
              <RatingContainer>
                <Rating rating={avgRating} color={"var(--color-black)"} />{" "}
                <span>{avgRating?.toFixed(2)}</span>
              </RatingContainer>
              how you score
            </>
          ) : (
            "You should be rating more..."
          )}
        </StatsItem>
        <StatsItem>
          {totalFavorites ? (
            <>
              <HeartContainer>
                {totalFavorites} <HeartIcon />
              </HeartContainer>{" "}
              games you love
            </>
          ) : (
            "Don't you love games?"
          )}
        </StatsItem>
      </Wrapper>
      <Wrapper>
        <StatsItem>
          {totalPlaying ? (
            <>
              <Number style={gameStatsStyle}>{totalPlaying}</Number>
              <Image src={playingGames} alt="Game console with tryhard face" />
              games you are playing
            </>
          ) : (
            "Don't let your games go to waste..."
          )}
        </StatsItem>
        <StatsItem>
          {totalDone ? (
            <>
              <Number style={gameStatsStyle}>{totalDone}</Number>
              <Image src={completedGames} alt="Game console smiling" />
              games you finished
            </>
          ) : (
            "Wow, it seems you haven't finished any games yet..."
          )}
        </StatsItem>
        <StatsItem>
          {totalAbandoned ? (
            <>
              <Number style={gameStatsStyle}>{totalAbandoned}</Number>
              <Image src={abandonedGames} alt="Game console with a sad face" />
              games you dropped
            </>
          ) : (
            "Drop it, drop it, drop it..."
          )}
        </StatsItem>
      </Wrapper>
    </Container>
  );
}
