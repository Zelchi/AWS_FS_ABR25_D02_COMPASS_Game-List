import React, { ReactNode } from "react";
import { Logo } from "@/components/image/Logo/Logo";
import styled from "styled-components";

type LoginType = {
  children: ReactNode;
  isRegistered: boolean;
  onRegister: () => void;
};

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  max-width: 47.5rem;
  padding: 0 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-dark-01-89);
  border-radius: 2rem;
  border: 0.2rem solid var(--color-aqua);
  z-index: 1;
`;

const BackgroundBlurL = styled.span`
  width: 191.57%;
  height: 100vh;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(13.75rem);
  border-radius: 100%;
  background-color: var(--color-aqua);
  opacity: 0.13;
  z-index: 0;
`;

const BackgroundBlurS = styled.span`
  width: 117.25%;
  height: 100%;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(15.16rem);
  border-radius: 100%;
  background-color: var(--color-aqua);
  opacity: 0.54;
  z-index: 0;
`;

const LogoContainer = styled.div`
  margin-top: 2.8rem;
  width: 14.9rem;
`;

const Title = styled.h1`
  margin-top: 1.2rem;
  margin-bottom: 1.6rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 2.8rem;
  color: var(--color-white);
`;

const Text = styled.p<{ $color: string; $marginBottom: number }>`
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom / 10}rem`};
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.4rem;
  color: ${({ $color }) => `var(${$color})`};
`;

const Link = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: underline;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.4rem;
  color: var(--color-aqua);
  transition: var(--transition);

  &:hover,
  &:focus {
    color: var(--color-aqua-dark);
  }
`;

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
        <Text $color={"--color-grey-01"} $marginBottom={isRegistered ? 54 : 24}>
          {isRegistered
            ? "Enter your credentials to access your account"
            : "Register yourself to access the system"}
        </Text>
        {children}
        <Text $color={"--color-grey-02"} $marginBottom={40}>
          {isRegistered ? "Don't have" : "Already have"} an account?{" "}
          <Link onClick={onRegister}>{isRegistered ? "Register" : "Login"} now</Link>
        </Text>
      </Container>
    </Wrapper>
  );
}
