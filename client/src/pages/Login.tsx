import { LoginBox } from "@/components/global/LoginBox";
import React, { useState } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import styled from "styled-components";
// @ts-ignore
import background from "../assets/background.webp";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(to right, var(--color-grey-dark-02-95), var(--color-grey-dark-02-95)),
    url(${background});
  background-position: center;
  background-size: cover;
`;

export default function Login({ onLogin }: { onLogin: () => void }): React.JSX.Element {
  const [isRegistered, setIsRegistered] = useState(true);

  const handleIsRegistered: () => void = (): void => {
    setIsRegistered((is: boolean): boolean => !is);
  };

  return (
    <Container>
      <LoginBox isRegistered={isRegistered} onRegister={handleIsRegistered}>
        <LoginForm isRegistered={isRegistered} onRegister={handleIsRegistered} onLogin={onLogin} />
      </LoginBox>
    </Container>
  );
}
