import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";
import Icon from "@/components/image/Icon/Icon";

const { mobile, laptop } = breakpoints;

export const FilterAndSearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2.5rem;

  @media (max-width: ${laptop}em) {
    flex-direction: column-reverse;
    gap: 1rem;
  }

  @media (max-width: ${mobile}em) {
    gap: 2rem;
  }
`;

export const FilterBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: ${laptop}em) {
    flex-direction: column;
    gap: 1rem;

    & > * {
      width: 100%;
    }
  }

  @media (max-width: ${mobile}em) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: ${laptop}em) {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
`;

export const FavoriteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    display: inline-block;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1;
    font-family: ${({ theme }) => theme.fonts.primary};

    @media (max-width: ${laptop}em) {
      font-weight: 500;
      font-size: 1.4rem;
    }
  }
`;

export const StyledIcon = styled(Icon)<{ $isFavorite?: boolean }>`
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  fill: ${({ theme, $isFavorite }) => ($isFavorite ? theme.colors.aqua : theme.colors.greyLight05)};
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover,
  &:focus-visible {
    fill: ${({ theme }) => theme.colors.aqua};
  }

  @media (max-width: ${laptop}em) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const FavoriteAndClearWrapper = styled.div`
  display: flex;

  & > * {
    width: calc(50% - 0.5rem);
  }

  & > *:last-child {
    margin-left: auto;
  }
`;
