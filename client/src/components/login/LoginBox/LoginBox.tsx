import React, { ReactNode } from "react";
import { Logo } from "@/components/image/Logo/Logo";
import {
  Wrapper,
  BackgroundBlurL,
  BackgroundBlurS,
  Container,
  LogoContainer,
  Title,
  Link,
  Text,
} from "@/components/login/LoginBox/styles";
import { theme } from "@/themes/theme";

type LoginType = {
  children: ReactNode;
  isRegistered: boolean;
  onRegister: () => void;
};

export function LoginBox({ children, isRegistered, onRegister }: LoginType): React.JSX.Element {
  return (
    <Wrapper>
      <BackgroundBlurS />
      <BackgroundBlurL />
      <Container>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Title>{isRegistered ? "Login" : "Sign Up"}</Title>
        <Text $color={theme.colors.grey01} $marginBottom={isRegistered ? 54 : 24}>
          {isRegistered
            ? "Enter your credentials to access your account"
            : "Register yourself to access the system"}
        </Text>
        {children}
        <Text $color={theme.colors.grey02} $marginBottom={40}>
          {isRegistered ? "Don't have" : "Already have"} an account?{" "}
          <Link onClick={onRegister}>{isRegistered ? "Register" : "Login"} now</Link>
        </Text>
      </Container>
    </Wrapper>
  );
}
