import styled from "styled-components";
import { darken, rgba } from "polished";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, tablet } = breakpoints;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 60rem;
  max-height: 90vh;
  background: white;
  border-radius: 2rem;
  box-shadow: ${({ theme }) => `0 0 3rem ${rgba(theme.colors.aqua, 0.3)}`};
  overflow: hidden;
  margin: 5rem;

  @media (max-width: ${mobile}em) {
    margin: 0;
    border-radius: 0;
    height: 100vh;
    max-height: 100vh;
  }
`;

export const ModalContent = styled.div`
  padding: 4rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.greyLight02};
  }

  &::-webkit-scrollbar-thumb {
    transition: ${({ theme }) => theme.transitions.fastInOut};
    cursor: pointer;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.aqua};
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => darken(0.2, theme.colors.aqua)};
  }

  @media (max-width: ${mobile}em) {
    padding: 2rem;
  }
`;
