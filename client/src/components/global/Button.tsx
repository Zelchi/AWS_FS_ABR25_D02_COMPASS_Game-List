import { ReactNode } from "react";
import styled from "styled-components";

type ButtonType = {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
};

const ButtonEl = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 1.4rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-white);
  background-color: var(--color-aqua);
  text-transform: uppercase;
  border: none;
  border-radius: 0.4rem;
  transition: var(--transition);

  &:hover,
  &:focus {
    background-color: var(--color-aqua-dark);
  }
`;

export default function Button({ type, children }: ButtonType) {
  return <ButtonEl type={type}>{children}</ButtonEl>;
}
