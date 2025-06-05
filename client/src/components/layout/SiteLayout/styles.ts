import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, tablet, laptop } = breakpoints;

export const Container = styled.div<{ $isOpen: boolean }>`
  overflow-x: hidden;
  display: grid;
  grid-template-columns: ${({ $isOpen }) => ($isOpen ? "27rem calc(100% - 27rem)" : "0% 100%")};
  transition: all 0.4s cubic-bezier(0.61, -0.53, 0.44, 1.55);

  @media (max-width: ${laptop}em) {
    grid-template-columns: ${({ $isOpen }) => ($isOpen ? "25% 75%" : "0% 100%")};
  }

  @media (max-width: ${tablet}em) {
    grid-template-rows: ${({ $isOpen }) =>
      $isOpen ? "12.08rem calc(100% - 12.08rem)" : "0% 100%"};
    grid-template-columns: 100%;
  }

  @media (max-width: ${mobile}em) {
    grid-template-rows: auto;
  }
`;

export const MainContent = styled.main`
  overflow-y: scroll;
  height: 100vh;
  padding: 2.1rem 3rem 3rem;
  background-color: ${({ theme }) => theme.colors.greyDark02};

  & > * {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.sizes.mainMaxWidth};
  }

  @media (max-width: ${mobile}em) {
    padding-top: 10.58rem;
  }
`;
