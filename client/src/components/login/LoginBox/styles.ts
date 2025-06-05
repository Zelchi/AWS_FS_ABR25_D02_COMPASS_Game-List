import styled from "styled-components";
import { flexCenter } from "@/styles/mixins";
import { darken, rgba } from "polished";

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  ${flexCenter};

  position: relative;
  flex-direction: column;
  max-width: 47.5rem;
  padding: 0 3rem;
  background-color: ${({ theme }) => rgba(theme.colors.greyDark01, 0.89)};
  border-radius: 2rem;
  border: ${({ theme }) => `0.2rem solid ${theme.colors.aqua}`};
  z-index: 1;
`;

export const BackgroundBlurL = styled.span`
  z-index: 0;
  opacity: 0.13;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 191.57%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.aqua};
  border-radius: 100%;
  filter: blur(13.75rem);
`;

export const BackgroundBlurS = styled.span`
  z-index: 0;
  opacity: 0.54;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 117.25%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.aqua};
  border-radius: 100%;
  filter: blur(15.16rem);
`;

export const LogoContainer = styled.div`
  width: 14.9rem;
  margin-top: 2.8rem;
`;

export const Title = styled.h1`
  margin-top: 1.2rem;
  margin-bottom: 1.6rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  font-size: 2.8rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};
`;

export const Text = styled.p<{ $color: string; $marginBottom: number }>`
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom / 10}rem`};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 1.4rem;
  color: ${({ $color }) => $color};
`;

export const Link = styled.button`
  cursor: pointer;
  border: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 1.4rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.aqua};
  background: none;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover,
  &:focus {
    color: ${({ theme }) => darken(0.2, theme.colors.aqua)};
  }
`;
