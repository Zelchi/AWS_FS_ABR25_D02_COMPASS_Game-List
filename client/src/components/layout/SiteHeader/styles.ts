import styled from "styled-components";
import Button from "@/components/button/Button";
import { breakpoints } from "@/utils/breakpoints";

const { mobile } = breakpoints;

export const Header = styled.header`
  display: flex;
  align-items: center;

  @media (max-width: ${mobile}em) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};
`;

export const Separator = styled.hr`
  margin: 3rem 0;
  color: ${({ theme }) => theme.colors.greyLight01};

  @media (max-width: ${mobile}em) {
    margin: 1.5rem 0 2rem;
    width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;

  @media (max-width: ${mobile}em) {
    margin: 0 0 3rem;
  }
`;
