import { LoginBox } from "@/components/global/LoginBox";
import React, { ComponentType, useState } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import styled from "styled-components";
// @ts-ignore
import background from "../assets/background.webp";
import BackgroundIcons from "@/components/global/BgIcons";

const Container = styled.main`
  width: 100%;
  padding: 5rem;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(to right, var(--color-grey-dark-02-95), var(--color-grey-dark-02-95)),
    url(${background});
  background-position: center;
  background-size: cover;
  overflow-x: hidden;

  @media (max-width: 26.56em) {
    padding: 2rem;
  }
`;

export default function Login(): React.JSX.Element {
  const [isRegistered, setIsRegistered] = useState(true);

  const handleIsRegistered: () => void = (): void => {
    setIsRegistered((is: boolean): boolean => !is);
  };

  return (
    <Container>
      <BackgroundIcons />
      <LoginBox isRegistered={isRegistered} onRegister={handleIsRegistered}>
        <LoginForm isRegistered={isRegistered} onRegister={handleIsRegistered} />
      </LoginBox>
    </Container>
  );
}
