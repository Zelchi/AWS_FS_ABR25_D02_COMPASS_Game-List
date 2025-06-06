import styled from "styled-components";
import { rgba } from "polished";
import Checkbox from "@/components/forms/Fields/Checkbox";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, tablet } = breakpoints;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 2rem;
  box-shadow: ${({ theme }) => `0 0 3rem ${rgba(theme.colors.aqua, 0.3)}`};
`;

export const ModalList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  max-width: 35rem;
  padding: 2rem 0;

  @media (max-width: ${tablet}em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${mobile}em) {
    grid-template-columns: 1fr;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  flex-shrink: 0;
  transform: scale(0.5);
`;

export const Topics = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.greyDark03};
`;
