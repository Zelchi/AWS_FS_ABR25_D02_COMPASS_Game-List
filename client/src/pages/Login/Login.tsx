import React, { useState } from "react";
import styled from "styled-components";
import background from "@/assets/background.webp";
import { LoginBox } from "@/components/global/LoginBox";
import { LoginForm } from "@/components/forms/LoginForm";
import BackgroundIcons from "@/components/global/BgIcons";

const Container = styled.main`
  width: 100%;
  padding: 5rem;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => `
    linear-gradient(
      to right,
      ${theme.colors.greyDark0295},
      ${theme.colors.greyDark0295}
    ),
    url(${background}) center / cover no-repeat
  `};
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
