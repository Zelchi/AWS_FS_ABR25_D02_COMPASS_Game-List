import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";

const { mobile } = breakpoints;

export const Container = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${mobile}em) {
    display: block;
    position: absolute;
    top: 3.81rem;
    right: 2.5rem;
    transform: translateY(-50%);

    span {
      display: block;
      transition: all 0.3s ease-in-out;
      border-radius: 100rem;
      background-color: ${({ theme, $isOpen }) =>
        $isOpen ? theme.colors.aqua : theme.colors.white};
      width: 3rem;
      height: 0.4rem;

      &:not(:last-child) {
        margin-bottom: 0.6rem;
      }

      &:nth-child(1) {
        transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "none")};
        transform-origin: top left;
      }

      &:nth-child(2) {
        background-color: ${({ theme, $isOpen }) =>
          $isOpen ? theme.colors.greyDark01 : theme.colors.white};
      }

      &:nth-child(3) {
        transform: ${({ $isOpen }) => ($isOpen ? "rotate(-45deg)" : "none")};
        transform-origin: bottom left;
      }
    }
  }
`;
