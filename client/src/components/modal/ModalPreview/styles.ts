import styled, { css } from "styled-components";
import SmartImage from "@/components/logic/SmartImage";
import Icon from "@/components/image/Icon/Icon";
import { darken, mix } from "polished";
import { theme } from "@/themes/theme";
import PlatformImages from "@/components/image/PlatformImages/PlatformImages";
import { breakpoints } from "@/utils/breakpoints";

const { tablet } = breakpoints;

export function getRatingColor(rating: number) {
  const minColor = theme.colors.pink;
  const maxColor = darken(0.2, theme.colors.aqua);
  const weight = (rating - 1) / 4;
  return mix(weight, maxColor, minColor);
}

const tag = css`
  display: inline-block;
  padding: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  gap: 3rem;
`;

export const GameInfo = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.4rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1rem;

  & > *:last-child {
    align-self: start;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.greyLight01};
    padding: 1rem;
  }

  @media (max-width: ${tablet}em) {
    grid-template-columns: 1fr;

    & > *:last-child {
      margin-top: 2rem;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Field = styled.span`
  //margin-bottom: 0.75rem;
`;

export const Label = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const Image = styled.span`
  display: block;
  width: 100%;
  max-width: 100%;
  height: 180px;
  border-radius: 6px;
  margin-bottom: 1rem;
  background-color: #eee;
`;

export const GameImage = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const Banner = styled(SmartImage)`
  display: block;
  width: 100%;
  height: 20rem;
  border-radius: 0.8rem;
`;

export const GameTitle = styled.div`
  position: absolute;
  bottom: 3rem;
  left: -3rem;
  transform: skew(-35deg);
  max-width: 95%;
  padding: 0.5rem 6rem;

  background-color: ${({ theme }) => theme.colors.aqua};
  box-shadow: ${({ theme }) => `2rem 1.5rem 0 ${theme.colors.greyDark03}`};

  span {
    display: inline-block;
    transform: skew(35deg);
    width: fit-content;
    color: ${({ theme }) => theme.colors.greyDark03};
    font-weight: 600;
    font-size: 1.8rem;
    font-family: ${({ theme }) => theme.fonts.primary};
  }
`;

export const GameDescription = styled.div`
  margin-bottom: 1rem;
`;

export const GameSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  grid-column: 1 / -1;
`;

export const StyledIcon = styled(Icon)<{ $isFavorite: boolean }>`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  fill: ${({ theme, $isFavorite }) => ($isFavorite ? theme.colors.aqua : theme.colors.greyLight01)};
  stroke: none;
`;

export const GameStatus = styled.span<{ $status: string }>`
  ${tag};
  background-color: ${({ theme, $status }) =>
    $status === "playing"
      ? theme.colors.grey02
      : $status === "done"
        ? darken(0.2, theme.colors.aqua)
        : theme.colors.pink};
`;

export const Multiplatform = styled.span`
  ${tag};

  background-color: ${({ theme }) => theme.colors.greyDark01};
`;

export const GameRating = styled.span<{ $rating: number }>`
  ${tag};

  background-color: ${({ $rating }) => getRatingColor($rating)};
`;

export const Categories = styled.span`
  margin-bottom: 1rem;
`;

export const StyledPlatformImages = styled(PlatformImages)`
  justify-content: flex-start;
  max-width: 100%;
`;
