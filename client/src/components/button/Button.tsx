import { ReactNode, useRef } from "react";
import { Button as StyledButton } from "./styles";

type ButtonProps = {
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "shortcut" | "danger";
  full?: boolean;
  upper?: boolean;
  color?: string;
  disabled?: boolean;
};

export default function Button({
  className,
  children,
  type = "button",
  onClick,
  size,
  variant,
  full,
  upper,
  color,
  disabled,
}: ButtonProps) {
  return (
    <StyledButton
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      $size={size}
      $variant={variant}
      $full={full}
      $upper={upper}
      $color={color}
    >
      {children}
    </StyledButton>
  );
}
