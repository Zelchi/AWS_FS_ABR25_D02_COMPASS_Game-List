import styled from "styled-components";
import Icon from "@/components/image/Icon/Icon";
import { breakpoints } from "@/utils/breakpoints";

const { tablet } = breakpoints;

export type FloatingImgStyleProps = {
  $width: number;
  $top?: number;
  $bottom?: number;
  $left?: number;
  $right?: number;
  $rotate: number;
  $blur: number;
};

export const StyledIcon = styled(Icon)<FloatingImgStyleProps>`
  position: absolute;
  width: ${({ $width }) => `${$width}rem`};
  top: ${({ $top }) => ($top !== undefined ? `${$top}rem` : "auto")};
  bottom: ${({ $bottom }) => ($bottom !== undefined ? `${$bottom}rem` : "auto")};
  left: ${({ $left }) => ($left !== undefined ? `${$left}rem` : "auto")};
  right: ${({ $right }) => ($right !== undefined ? `${$right}rem` : "auto")};
  transform: rotate(${({ $rotate }) => `${$rotate}deg`});
  filter: blur(${({ $blur }) => `${$blur}px`});

  @media (max-width: ${tablet}em) {
    display: none;
  }
`;
