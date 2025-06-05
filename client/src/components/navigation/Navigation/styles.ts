import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, tablet } = breakpoints;

export const Nav = styled.nav<{ $isOpen: boolean }>`
  overflow: hidden;
  width: 71.85%;
  height: 100%;
  transition:
    height 0.5s ease-in-out,
    opacity 0.5s ease-in-out;

  @media (max-width: ${tablet}em) {
    margin-bottom: 1.5rem;
    padding: 0 3rem;
    width: 100%;
  }

  @media (max-width: ${mobile}em) {
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    margin-bottom: 0;
    height: ${({ $isOpen }) => ($isOpen ? "calc(100vh - 7.825rem)" : "0")};
  }
`;

export const NavList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  list-style: none;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  @media (max-width: ${tablet}em) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }

  @media (max-width: ${mobile}em) {
    flex-direction: column;
    gap: 2rem;
    margin: auto 0;
  }
`;
