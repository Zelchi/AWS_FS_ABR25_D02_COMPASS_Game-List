import styled from "styled-components";
import Icon from "@/components/image/Icon/Icon";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, laptop } = breakpoints;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${mobile}em) {
    margin-bottom: 2rem;

    div {
      flex-direction: column;
    }
  }
`;

export const SearchForm = styled.form<{ $path: string }>`
  display: flex;
  gap: 1rem;

  @media (max-width: ${laptop}em) {
    & > * {
      width: ${({ $path }) => ($path === "/Games" ? "100%" : "calc(50% - 0.5rem)")};
    }
  }

  @media (max-width: ${mobile}em) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 21.2rem;
  padding: 0.8rem 1.4rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 0.4rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyLight05};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0.2rem 1.2rem ${theme.colors.aqua}`};
  }

  @media (max-width: ${laptop}em) {
    width: 100%;
  }

  @media (max-width: ${mobile}em) {
    flex-shrink: 0;
    width: 100%;
  }
`;

export const StyledIcon = styled(Icon)`
  width: 1.4rem;
`;
