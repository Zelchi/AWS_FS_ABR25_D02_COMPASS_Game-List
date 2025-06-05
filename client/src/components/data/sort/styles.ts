import styled from "styled-components";
import Icon from "@/components/image/Icon/Icon";
import { flexCenter } from "@/styles/mixins";

export const Button = styled.button`
  ${flexCenter};

  cursor: pointer;
  gap: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.grey03};
  background: none;
  border: none;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.aqua};

    svg {
      fill: ${({ theme }) => theme.colors.aqua};
    }
  }
`;

export const StyledIcon = styled(Icon)<{ $asc?: boolean }>`
  width: 1.2rem;
  transform: ${({ $asc }) => ($asc ? "" : "rotate(180deg)")};
  fill: ${({ theme }) => theme.colors.aqua};
  transition: ${({ theme }) => theme.transitions.fastInOut};
`;
