import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexCenter } from "@/styles/mixins";

export const Wrapper = styled.div`
  ${flexCenter};

  flex-direction: column;
  height: 100vh;
  text-align: center;
  color: ${({ theme }) => theme.colors.yellowLight};
  background-color: ${({ theme }) => theme.colors.greyDark01};
  user-select: none;
`;

export const ErrorContainer = styled.div`
  ${flexCenter};
`;

export const SadFace = styled.img`
  width: 100rem;
  height: auto;
`;

export const Message = styled.h1`
  margin-top: 0.5rem;
  font-size: 2.4rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
`;

export const SubMessage = styled.p`
  margin-top: 1rem;
  max-width: 100%;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.6rem;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.grey01};
`;

export const ButtonWrapper = styled.div`
  margin-top: 2.5rem;
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  font-size: 1.4rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.greyDark01};
  background-color: ${({ theme }) => theme.colors.yellowLight};
  border-radius: 0.8rem;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyLight02};
  }
`;

export const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;
