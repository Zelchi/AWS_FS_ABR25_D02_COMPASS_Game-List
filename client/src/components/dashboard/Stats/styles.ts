import styled from "styled-components";
import SmartImage from "@/components/logic/SmartImage";
import RatingSummary from "@/components/rating/Summary/RatingSummary";
import { breakpoints } from "@/utils/breakpoints";
import { flexCenter } from "@/styles/mixins";
import Icon from "@/components/image/Icon/Icon";

const { mobile, tablet, laptop } = breakpoints;

export const StatsItem = styled.div`
  ${flexCenter};

  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;

  @media (max-width: 30em) {
    padding: 1rem;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;

  @media (max-width: ${laptop}em) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${mobile}em) {
    gap: 1.2rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;

  &:first-child {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 0.75rem));

    @media (max-width: ${laptop}em) {
      grid-template-columns: repeat(4, calc(25% - 1.15rem));
    }

    @media (max-width: ${tablet}em) {
      grid-template-columns: repeat(2, calc(50% - 0.75rem));
    }
  }

  &:last-child {
    span {
      margin-bottom: auto;
      font-size: 5rem;
    }
  }

  @media (max-width: ${mobile}em) {
    gap: 1.2rem;
  }
`;

export const Number = styled.span`
  font-size: 3.5rem;
  font-weight: 700;

  @media (max-width: ${laptop}em) {
    font-size: 2.5rem;
  }
`;

export const PlatformImage = styled(SmartImage)`
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.5rem;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 3.5rem;
  font-weight: 800;

  @media (max-width: ${laptop}em) {
    font-size: 2.5rem;
  }
`;

export const HeartContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 800;

  @media (max-width: ${laptop}em) {
    font-size: 2.5rem;
  }
`;

export const Rating = styled(RatingSummary)`
  width: 5rem;

  @media (max-width: ${laptop}em) {
    width: 4rem;
  }
`;

export const StyledHeartIcon = styled(Icon)`
  width: 5.2rem;
  fill: ${({ theme }) => theme.colors.aqua};
  stroke: ${({ theme }) => theme.colors.aqua};

  @media (max-width: ${laptop}em) {
    width: 4.2rem;
  }
`;

export const Image = styled.img`
  width: 120%;
`;
