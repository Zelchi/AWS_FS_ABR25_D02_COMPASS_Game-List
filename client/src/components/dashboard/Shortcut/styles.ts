import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";
import { flexCenter } from "@/styles/mixins";
import Icon from "@/components/image/Icon/Icon";
import Button from "@/components/button/Button";
import { darken } from "polished";

const { mobile, laptop, desktop } = breakpoints;

export const GroupContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: ${mobile}em) {
    gap: 1rem;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 5.5rem auto 2fr;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.greyDark03};
  border: ${({ theme }) => `1px solid ${theme.colors.greyDark02}`};
  border-radius: 0.8rem;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:has(button:hover, button:focus) {
    border: ${({ theme }) => `1px solid ${theme.colors.white}`};
    background-color: ${({ theme }) => darken(0.2, theme.colors.aqua)};
  }

  @media (max-width: ${desktop}em) {
    grid-template-columns: auto auto 2fr;
    align-items: flex-end;
  }

  @media (max-width: ${laptop}em) {
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: ${mobile}em) {
    gap: 1rem;
    padding: 1rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: ${desktop}em) {
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: ${laptop}em) {
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
  }

  @media (max-width: ${mobile}em) {
    gap: 0.5rem;
  }
`;

export const StyledIcon = styled(Icon)`
  ${flexCenter};

  height: 100%;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${desktop}em) {
    width: 4rem;
  }

  @media (max-width: ${laptop}em) {
    margin-bottom: -0.5rem;
  }

  @media (max-width: ${mobile}em) {
    width: 2.5rem;
  }
`;

export const Number = styled.span`
  font-size: 5.2rem;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;

  @media (max-width: ${desktop}em) {
    font-size: 6.5rem;
    line-height: 0.8;
  }

  @media (max-width: ${laptop}em) {
    margin-left: auto;
    font-size: 3rem;
    line-height: 0.8;
  }

  @media (max-width: ${mobile}em) {
    margin-left: unset;
    font-size: 2rem;
  }
`;

export const Type = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1;

  @media (max-width: ${desktop}em) {
    font-size: 1.2rem;
  }

  @media (max-width: ${laptop}em) {
    font-weight: 400;
    font-size: 1.4rem;
  }
`;

export const StyledButton = styled(Button)`
  svg {
    transition: ${({ theme }) => theme.transitions.fastInOut};
    width: 0.6rem;
    height: 0.6rem;
  }

  @media (max-width: ${desktop}em) {
    display: flex;
    gap: 1rem;
    height: 100%;
    font-weight: 600;

    & > :last-child {
      ${flexCenter};
    }

    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  @media (max-width: ${laptop}em) {
    gap: 0.5rem;

    & > :last-child {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }

    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }

  @media (max-width: ${laptop}em) {
    flex-wrap: wrap;
    gap: 0.2rem;
  }
`;
