import styled, { DefaultTheme } from "styled-components";
import { flexCenter } from "@/styles/mixins";
import { darken } from "polished";

const getBackground = (theme: DefaultTheme, variant: string, color: string | undefined) => {
  if (variant === "primary") return theme.colors.aqua;
  if (variant === "secondary") return theme.colors.grey03;
  if (variant === "shortcut") return theme.colors.white;
  if (variant === "danger") return theme.colors.pink;
  return color;
};

const getHoverBackground = (theme: DefaultTheme, variant: string, color: string | undefined) => {
  if (variant === "primary") return darken(0.2, theme.colors.aqua);
  if (variant === "secondary") return darken(0.2, theme.colors.grey03);
  if (variant === "danger") return darken(0.2, theme.colors.pink);
  return color;
};

type ButtonProps = {
  $size?: "small" | "medium" | "large";
  $variant?: "primary" | "secondary" | "shortcut" | "danger";
  $full?: boolean;
  $upper?: boolean;
  $color?: string;
};

export const Button = styled.button<ButtonProps>`
  ${flexCenter};

  cursor: pointer;
  gap: ${({ $variant = "primary" }) => ($variant === "shortcut" ? "0.5rem" : "1rem")};
  width: ${({ $full }) => ($full ? "100%" : "fit-content")};
  padding: ${({ $size = "medium", $variant = "primary" }) =>
    $size === "large" || $variant === "shortcut"
      ? "1.4rem"
      : $size === "medium"
        ? ".8rem 1.2rem"
        : ".5rem"};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: ${({ $size = "medium" }) =>
    $size === "large" ? "1.4rem" : $size === "medium" ? "1.2rem" : "1rem"};
  line-height: 1;
  color: ${({ theme, $variant = "primary" }) =>
    $variant === "shortcut" ? theme.colors.grey02 : theme.colors.white};
  background-color: ${({ theme, $variant = "primary", $color }) =>
    getBackground(theme, $variant, $color)};
  text-transform: ${({ $upper }) => ($upper ? "uppercase" : "unset")};
  border: none;
  border-radius: ${({ $variant = "primary" }) => ($variant === "shortcut" ? "0.5rem" : "0.4rem")};
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover,
  &:focus {
    background-color: ${({ theme, $variant = "primary", $color }) =>
      getHoverBackground(theme, $variant, $color)};
    color: ${({ theme, $variant }) =>
      $variant === "shortcut" ? darken(0.2, theme.colors.aqua) : "auto"};
  }
`;
