import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  background-color: var(--color-white);
  border-radius: 0.8rem;

  @media (max-width: 30em) {
    padding: 1rem;
  }
`;

export default function StatsItem({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
