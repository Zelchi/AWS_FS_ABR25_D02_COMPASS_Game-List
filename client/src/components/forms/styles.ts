import styled from "styled-components";
import { breakpoints } from "@/utils/breakpoints";

const { tablet } = breakpoints;

export const Form = styled.form`
  display: grid;
  row-gap: 1.5rem;
  width: 41.5rem;
  margin-bottom: 2.8rem;

  & > *:last-child {
    margin-top: 2.4rem;
  }

  @media (max-width: ${tablet}em) {
    width: 100%;
  }
`;

export const InvalidMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: right;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.pink};
`;
