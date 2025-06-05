import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, tablet, laptop } = breakpoints;

export const StyledSideBar = styled.aside<{ $isOpen: boolean }>`
  overflow: hidden;
  z-index: 999;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: ${({ theme }) => `0.2rem solid ${theme.colors.greyLight03}`};
  background-color: ${({ theme }) => theme.colors.greyDark01};

  @media (max-width: ${tablet}em) {
    z-index: 9999;
    border-right: none;
    border-bottom: ${({ theme }) => `0.2rem solid ${theme.colors.greyLight03}`};
  }

  @media (max-width: ${mobile}em) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

export const LogoContainer = styled.div`
  width: 11.8rem;
  margin-top: 2.4rem;
  margin-bottom: 3.2rem;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:has(a:focus, a:hover) {
    transform: scale(1.1);
  }

  @media (max-width: ${tablet}em) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
