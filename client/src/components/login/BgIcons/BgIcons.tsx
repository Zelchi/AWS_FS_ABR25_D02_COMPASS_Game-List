import React from "react";
import ControllerIcon from "@/assets/icons/controller.svg?react";
import AlienIcon from "@/assets/icons/alien.svg?react";
import PsSymbolsIcon from "@/assets/icons/ps-symbols-outline.svg?react";
import { StyledIcon } from "@/components/login/BgIcons/styles";
import { theme } from "@/themes/theme";

export default function BgIcons(): React.JSX.Element {
  return (
    <>
      <StyledIcon
        icon={ControllerIcon}
        $rotate={-11.69}
        $blur={7.1}
        $width={8.5}
        $top={9.2}
        $left={13.425}
        strokeColor={theme.colors.aqua}
      />
      <StyledIcon
        icon={ControllerIcon}
        $rotate={11.69}
        $blur={2.3}
        $width={10.472}
        $bottom={10.6}
        $right={13.2}
        strokeColor={theme.colors.aqua}
      />
      <StyledIcon
        icon={AlienIcon}
        $rotate={15.37}
        $blur={4.4}
        $width={11.7}
        $top={4.6}
        $right={-3.082}
        fillColor={theme.colors.aqua}
      />
      <StyledIcon
        icon={PsSymbolsIcon}
        $rotate={-8.28}
        $blur={4.15}
        $width={8.489}
        $bottom={5.977}
        $left={13.4}
        fillColor={theme.colors.aqua}
      />
    </>
  );
}
