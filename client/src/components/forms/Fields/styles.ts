import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.grey01};
`;

export const Input = styled.input`
  padding: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.greyDark01};
  border-radius: 0.4rem;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.greyLight01}`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyLight02};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0.2rem 1.2rem ${theme.colors.aqua}`};
  }
`;

export const Select = styled.select`
  padding: 0.8rem 1.4rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 0.4rem;

  option:disabled {
    color: ${({ theme }) => theme.colors.greyLight05};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0.2rem 1.2rem ${theme.colors.aqua}`};
  }
`;
