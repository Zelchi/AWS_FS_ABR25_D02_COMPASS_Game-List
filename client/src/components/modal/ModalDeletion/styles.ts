import styled from "styled-components";
import Icon from "@/components/image/Icon/Icon";
import { breakpoints } from "@/utils/breakpoints";

const { mobile } = breakpoints;

export const Container = styled.div`
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${mobile}em) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 4rem);

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Header = styled.h2`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 3.2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2rem;

  @media (max-width: ${mobile}em) {
    font-size: 2.6rem;
  }
`;

export const Message = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 2rem;
  line-height: 1;
  text-align: center;
  margin-bottom: 4.5rem;

  span {
    display: block;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.pink};
    font-weight: 600;
  }

  @media (max-width: ${mobile}em) {
    font-size: 1.6rem;
  }
`;

export const ButtonSet = styled.div`
  display: flex;
  gap: 4rem;

  @media (max-width: ${mobile}em) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const StyledIcon = styled(Icon)`
  width: 17.6rem;
  fill: ${({ theme }) => theme.colors.pink};
  stroke: none;
  margin-bottom: 2.5rem;

  @media (max-width: ${mobile}em) {
    width: 14rem;
  }
`;
