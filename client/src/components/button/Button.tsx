import { ReactNode, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

type ButtonType = {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
};

const ButtonEl = styled.button<{ $size?: string; $variant: string; $path: string }>`
  cursor: pointer;
  width: ${({ $size }) => ($size === "large" ? "100%" : "fit-content")};
  padding: ${({ $size }) => ($size === "large" ? "1.4rem" : ".8rem 1.2rem")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: ${({ $size }) =>
    $size === "large" ? "1.4rem" : $size === "medium" ? "1.2rem" : "1rem"};
  color: var(--color-white);
  background-color: ${({ $variant }) =>
    $variant === "primary" ? "var(--color-aqua)" : "var(--color-grey-03)"};
  text-transform: ${({ $size }) => ($size === "large" ? "uppercase" : "auto")};
  border: none;
  border-radius: 0.4rem;
  transition: var(--transition);

  &:hover,
  &:focus {
    background-color: ${({ $variant }) =>
      $variant === "primary" ? "var(--color-aqua-dark)" : "var(--color-grey-04)"};
  }

  @media (max-width: 30em) {
    // width: ${({ $path }) => ($path === "/Games" ? "100%" : "")};
  }
`;

export default function Button({
  children,
  type = "button",
  onClick,
  size,
  variant = "primary",
}: ButtonType) {
  const path = useLocation().pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (onClick) onClick();
    buttonRef.current?.blur();
  };

  return (
    <ButtonEl
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      $size={size}
      $variant={variant}
      $path={path}
    >
      {children}
    </ButtonEl>
  );
}
