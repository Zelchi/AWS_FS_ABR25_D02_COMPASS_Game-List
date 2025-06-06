import Button from "@/components/button/Button";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.greyDark01};
  margin: 1.5rem 0 1rem;
`;

export const SelectedOptions = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.greyDark01};

  span {
    display: inline-block;
    margin-bottom: 0.3rem;
    font-weight: 500;
  }
`;
