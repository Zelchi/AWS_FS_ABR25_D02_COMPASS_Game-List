import styled from "styled-components";
import { motion } from "framer-motion";
import { darken } from "polished";
import SmartImage from "@/components/logic/SmartImage";
import { flexCenter } from "@/styles/mixins";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, laptop } = breakpoints;

export const Container = styled(motion.div)`
  ${flexCenter};

  width: 100%;
  height: 20rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2rem;
  overflow: hidden;

  @media (max-width: ${laptop}em) {
    gap: 3rem;
    padding: 2.2rem;
  }

  @media (max-width: ${mobile}em) {
    flex-direction: column;
    padding-top: 0;
    height: auto;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;

  @media (max-width: ${laptop}em) {
    display: flex;
    align-items: center;
    width: fit-content;
  }

  @media (max-width: ${mobile}em) {
    height: auto;
  }
`;

export const Image = styled(SmartImage)`
  display: block;
  width: 120%;
  height: 100%;
  margin-left: -20%;
  clip-path: circle(50% at 50% 50%);

  @media (max-width: ${laptop}em) {
    margin-left: 0;
    width: 15rem;
    height: 15rem;
  }

  @media (max-width: ${mobile}em) {
    clip-path: unset;
    width: 45rem;
    height: 15rem;
  }
`;

export const GameTitle = styled.div`
  position: absolute;
  bottom: 3rem;
  left: -3rem;
  transform: skew(-35deg);
  max-width: 95%;
  padding: 0.5rem 8rem;
  background-color: ${({ theme }) => theme.colors.aqua};
  box-shadow: ${({ theme }) => `2rem 1.5rem 0 ${theme.colors.greyDark03}`};

  span {
    display: inline-block;
    transform: skew(35deg);
    width: fit-content;
    color: ${({ theme }) => theme.colors.greyDark03};
    font-weight: 600;
    font-size: 2rem;
    font-family: ${({ theme }) => theme.fonts.primary};
  }
`;

export const GameTitleTag = styled.span`
  width: fit-content;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => darken(0.2, theme.colors.aqua)};
  border-radius: 0.3rem;
`;

export const QuestionContainer = styled.div`
  width: 50%;
  padding: 2rem 2rem 2rem 0;

  @media (max-width: ${laptop}em) {
    padding: 0;
    width: auto;
  }
`;

export const QuestionWrapper = styled.div`
  width: fit-content;
  margin-left: auto;
  padding-right: 4rem;

  @media (max-width: ${laptop}em) {
    padding: 0;
  }

  @media (max-width: ${mobile}em) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Question = styled.p`
  display: inline-block;
  max-width: 100%;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 800;
  font-size: 3.5rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};

  @media (max-width: ${laptop}em) {
    font-size: 2.6rem;
  }

  @media (max-width: ${mobile}em) {
    text-align: center;
  }
`;

export const ButtonSet = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  button {
    flex-shrink: 0;
    font-size: 1.2rem;

    &:not(:last-child) {
      color: ${({ theme }) => theme.colors.greyDark03};
    }

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  @media (max-width: ${laptop}em) {
    flex-wrap: wrap;

    button {
      padding: 1rem;
      font-size: 1rem;
    }
  }
`;

export const Wrapper = styled(motion.div)`
  margin-top: 4rem;
  transition: all 3s;

  @media (max-width: 48em) {
    margin-top: 1rem;
  }
`;
