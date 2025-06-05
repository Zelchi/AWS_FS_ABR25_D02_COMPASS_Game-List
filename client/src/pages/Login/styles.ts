import styled from "styled-components";
import background from "@/assets/imgs/background.webp";
import { flexCenter } from "@/styles/mixins";
import { breakpoints } from "@/utils/breakpoints";
import { rgba } from "polished";

const { mobile } = breakpoints;

export const Container = styled.main`
  ${flexCenter};
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 5rem;
  background: ${({ theme }) => `
    linear-gradient(
      to right,
      ${rgba(theme.colors.greyDark02, 0.95)},
      ${rgba(theme.colors.greyDark02, 0.95)}
    ),
    url(${background}) center / cover no-repeat
  `};
  overflow-x: hidden;

  @media (max-width: ${mobile}em) {
    padding: 2rem;
  }
`;
