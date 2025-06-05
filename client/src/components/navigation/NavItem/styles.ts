import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";
import Icon from "@/components/image/Icon/Icon";
import { lighten } from "polished";

const { mobile, tablet, laptop } = breakpoints;

export const ListItem = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  &:last-child {
    margin-top: auto;
    margin-bottom: 3.2rem;

    @media (max-width: ${tablet}em) {
      margin: auto;
      width: fit-content;
    }

    @media (max-width: ${mobile}em) {
      justify-content: center;
      margin: 30% 0 0;
    }
  }
`;

export const Link = styled.a<{ $active: boolean; $label: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${({ $label }) => ($label === "Logout" ? "flex-end" : "auto")};
  flex-direction: ${({ $label }) => ($label === "Logout" ? "row-reverse" : "row")};
  gap: 1.5rem;
  width: 100%;
  padding: 1.2rem 1.2rem 1.2rem 4rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1;
  text-decoration: none;
  border-radius: 0.4rem;
  transition: ${({ theme }) => theme.transitions.fastInOut};
  fill: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.white)};
  stroke: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.white)};

  span {
    background-color: ${({ $label }) => ($label === "Logout" ? "none" : "unset")};
    padding: ${({ $label }) => ($label === "Logout" ? 0 : "unset")};
  }

  @media (max-width: ${tablet}em) {
    gap: 1rem;
    font-size: 1.2rem;
  }

  @media (max-width: ${mobile}em) {
    display: block;
    font-size: 1.4rem;
  }

  &:visited,
  &:link {
    background-color: ${({ theme, $active }) => ($active ? theme.colors.aqua : "transparent")};
    color: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.white)};
  }

  &:hover,
  &:focus {
    background-color: ${({ theme, $active }) =>
      $active ? lighten(0.2, theme.colors.aqua) : "transparent"};
    color: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.aqua)};
    fill: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.aqua)};
    stroke: ${({ theme, $active }) => ($active ? theme.colors.black : theme.colors.aqua)};
  }

  @media (max-width: ${laptop}em) {
    padding: 1.2rem 1.2rem 1.2rem 1.5rem;
  }

  @media (max-width: ${tablet}em) {
    padding: 0.5rem;
    width: fit-content;
  }

  @media (max-width: ${mobile}em) {
    display: flex;
    justify-content: center;
    padding: 1.2rem;
    width: 100%;

    span {
      font-size: 1.6rem;
    }
  }
`;

export const StyledIcon = styled(Icon)<{ $active: boolean }>`
  flex-shrink: 0;
  width: 1.8rem;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  @media (max-width: ${tablet}em) {
    width: 1.2rem;
  }

  @media (max-width: ${mobile}em) {
    width: 1.8rem;
  }
`;
