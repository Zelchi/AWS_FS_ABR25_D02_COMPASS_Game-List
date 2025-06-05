import styled from "styled-components";
import Button from "@/components/button/Button";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, tablet } = breakpoints;

export const StyledButton = styled.button<{ $isOpen: boolean }>`
  cursor: pointer;
  width: 1.8rem;
  transform-origin: center;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(0deg)" : "rotate(-180deg)")};
  margin-right: 2rem;
  background: none;
  border: none;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    & > * {
      fill: ${({ theme }) => theme.colors.aqua};
    }
  }

  & > * {
    display: block;
    vertical-align: middle;
    fill: ${({ theme }) => theme.colors.greyLight05};
    transition: ${({ theme }) => theme.transitions.fastInOut};
  }

  @media (max-width: ${tablet}em) {
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
  }

  @media (max-width: ${mobile}em) {
    display: none;
  }
`;
