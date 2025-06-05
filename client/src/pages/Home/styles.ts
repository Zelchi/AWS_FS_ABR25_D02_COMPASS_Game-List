import styled from "styled-components";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import { Shortcut } from "@/components/dashboard/Shortcut/Shortcut";
import { Remainder } from "@/components/dashboard/Remainder/Remainder";
import { breakpoints } from "@/utils/breakpoints";

const { mobile, tablet, desktop } = breakpoints;

export const StyledSiteLayout = styled(SiteLayout)`
  padding: 0 6rem 4rem;
  background-color: ${({ theme }) => theme.colors.greyDark02};

  @media (max-width: ${desktop}em) {
    padding: 0 4rem;
  }

  @media (max-width: ${tablet}em) {
    padding: 2rem;
  }

  @media (max-width: ${mobile}em) {
    padding: 0;
  }
`;

export const Greeting = styled.h1`
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};
`;

export const SubGreeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 2.2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.grey08};

  @media (max-width: 48em) {
    font-size: 1.8rem;
  }
`;

export const StyledShortcutsContainer = styled(Shortcut)`
  margin-top: 2rem;
  margin-bottom: 5rem;

  @media (max-width: ${tablet}em) {
    margin-bottom: 3rem;
  }
`;

export const StyledRemainder = styled(Remainder)`
  margin-bottom: 4rem;
`;
