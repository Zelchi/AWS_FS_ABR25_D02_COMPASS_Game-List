import styled from "styled-components";
import SmartImage from "@/components/logic/SmartImage";
import RatingSummary from "@/components/rating/Summary/RatingSummary";
import Icon from "@/components/image/Icon/Icon";
import { darken } from "polished";

export const StyledTable = styled.table<{ $isAnimating: boolean; $transitionDuration: number }>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.5rem;
`;

export const THCell = styled.th<{ $head?: string }>`
  &:not(:last-child) {
    padding-right: 1.5rem;
    width: ${({ $head }) => ($head === "name" ? "30%" : "auto")};
  }
`;

export const TBody = styled.tbody<{ $isAnimating: boolean; $transitionDuration: number }>`
  opacity: ${({ $isAnimating }) => ($isAnimating ? "0.5" : "1")};
  filter: ${({ $isAnimating }) => ($isAnimating ? "blur(.4rem)" : "blur(0)")};
  transition: ${({ $transitionDuration }) => `filter ${$transitionDuration / 1000}s ease,
      opacity ${$transitionDuration / 1000}s ease;`};
`;

export const TBRow = styled.tr<{ $location: string }>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover,
  &:focus {
    box-shadow: 0 0.2rem 1.2rem ${({ theme }) => theme.colors.aqua};
  }

  & > * {
    padding: 1.5rem 1.5rem 1.5rem 0;

    &:first-child {
      border-radius: 0.8rem 0 0 0.8rem;
      padding-left: 1.5rem;

      @media (max-width: 30em) {
        padding: 1rem;
      }
    }

    &:last-child {
      border-radius: 0 0.8rem 0.8rem 0;
    }

    @media (max-width: 30em) {
      padding: 1rem 1rem 1rem 0;
    }
  }
`;

export const TBCell = styled.td<{ $width: boolean }>`
  width: ${({ $width }) => ($width ? "100%" : "auto")};

  @media (max-width: 67em) {
    &:first-child {
      border-radius: 0.8rem 0 0 0.8rem;
      background-color: ${({ theme }) => theme.colors.white};
      padding-left: 1.5rem;
    }
  }

  @media (max-width: 30em) {
    &:first-child {
      padding: 1rem;
    }
  }
`;

export const GameImage = styled(SmartImage)`
  display: block;
  width: 6.5rem;
  height: 5.5rem;
  border-radius: 0.8rem;
`;

export const Rating = styled(RatingSummary)`
  width: 2.2rem;
  height: 2.2rem;
`;

export const ButtonSet = styled.td<{ $location: string }>`
  width: 6.5rem;
  margin-left: auto;

  span {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 2.6rem;

    @media (max-width: 30em) {
      flex-direction: ${({ $location }) => ($location === "/Games" ? "column" : "row")};
      justify-content: ${({ $location }) => ($location === "/Games" ? "center" : "flex-end")};
      align-items: ${({ $location }) => ($location === "/Games" ? "flex-end" : "center")};
      gap: 1rem;
    }
  }
`;

export const HeaderStyledIcon = styled(Icon)`
  width: 1.7rem;
  height: 1.7rem;
  fill: ${({ theme }) => theme.colors.grey03};
  transition: ${({ theme }) => theme.transitions.fastInOut};
`;

export const BodyStyledIcon = styled(Icon)`
  cursor: pointer;
  width: 1.9rem;
  height: 1.9rem;
  fill: ${({ theme }) => theme.colors.aqua};
  background-color: transparent;
  border: none;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover,
  &:focus {
    fill: ${({ theme }) => darken(0.2, theme.colors.aqua)};
  }
`;
