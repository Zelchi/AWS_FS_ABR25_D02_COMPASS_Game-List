import React, { useState } from "react";
import { LoginBox } from "@/components/login/LoginBox/LoginBox";
import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import BackgroundIcons from "@/components/login/BgIcons/BgIcons";
import { Container } from "./styles";

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
