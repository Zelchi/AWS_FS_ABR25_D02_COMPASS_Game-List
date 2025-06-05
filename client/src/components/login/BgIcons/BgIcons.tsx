import React, { ComponentType } from "react";
import styled from "styled-components";

import controller from "@/assets/icons/controller.svg";
import alien from "@/assets/icons/alien.svg";
import psSymbols from "@/assets/icons/ps-symbols-outline.svg";

type FloatingIconProps = {
  src: string;
  alt: string;
  El: ComponentType<React.ImgHTMLAttributes<HTMLImageElement> & FloatingImgStyleProps>;
} & FloatingImgStyleProps;

type FloatingImgStyleProps = {
  $width: number;
  $top?: number;
  $bottom?: number;
  $left?: number;
  $right?: number;
  $rotate: number;
  $blur: number;
};

function Icon({ src, alt, El, ...rest }: FloatingIconProps): React.JSX.Element {
  return <El src={src} alt={`${alt} icon`} {...rest} />;
}

const FloatingImg = styled.img<FloatingImgStyleProps>`
  position: absolute;
  width: ${({ $width }) => `${$width}rem`};
  top: ${({ $top }) => ($top !== undefined ? `${$top}rem` : "auto")};
  bottom: ${({ $bottom }) => ($bottom !== undefined ? `${$bottom}rem` : "auto")};
  left: ${({ $left }) => ($left !== undefined ? `${$left}rem` : "auto")};
  right: ${({ $right }) => ($right !== undefined ? `${$right}rem` : "auto")};
  transform: rotate(${({ $rotate }) => `${$rotate}deg`});
  filter: blur(${({ $blur }) => `${$blur}px`});

  @media (max-width: 48em) {
    display: none;
  }
`;

export default function BackgroundIcons(): React.JSX.Element {
  return (
    <>
      <Icon
        El={FloatingImg}
        src={controller}
        alt="Controller"
        $rotate={-11.69}
        $blur={7.1}
        $width={8.5}
        $top={9.2}
        $left={13.425}
      />
      <Icon
        El={FloatingImg}
        src={controller}
        alt="Controller"
        $rotate={11.69}
        $blur={2.3}
        $width={10.472}
        $bottom={10.6}
        $right={13.2}
      />
      <Icon
        El={FloatingImg}
        src={alien}
        alt="Alien"
        $rotate={15.37}
        $blur={4.4}
        $width={11.7}
        $top={4.6}
        $right={-3.082}
      />
      <Icon
        El={FloatingImg}
        src={psSymbols}
        alt="PS symbols"
        $rotate={-8.28}
        $blur={4.15}
        $width={8.489}
        $bottom={5.977}
        $left={13.4}
      />
    </>
  );
}
