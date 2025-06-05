import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Label = styled.p<{ $size: number | undefined }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 800;
  font-size: ${({ $size = 2.4 }) => $size / 15}rem;
  color: ${({ theme }) => theme.colors.aqua};
`;
