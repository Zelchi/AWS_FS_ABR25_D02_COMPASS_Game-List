import styled from "styled-components";
import { Input } from "@/components/forms/Fields/Input";
import { darken, rgba } from "polished";
import Icon from "@/components/image/Icon/Icon";
import { breakpoints } from "@/utils/breakpoints";

const { mobile } = breakpoints;

export const Form = styled.form`
  display: grid;
  row-gap: 2rem;
  width: 100%;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > * {
    &:first-child {
      margin-bottom: 0.8rem;
    }
  }

  &:not(:last-child) {
    border-bottom: ${({ theme }) => `1px solid ${rgba(theme.colors.aqua, 0.4)}`};
    padding-bottom: 2rem;
  }
`;

export const FormFieldMobile = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${rgba(theme.colors.aqua, 0.4)}`};
  padding-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;

  & > * {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 50%;
  }
`;

export const StyledInput = styled(Input)<{ $type?: string }>`
  cursor: ${({ $type }) => ($type === "date" ? "pointer" : "auto")};
  width: 100%;
  height: ${({ $type }) => ($type === "textarea" ? "8rem" : "auto")};
  padding: 1rem 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.greyDark01};
  background-color: ${({ theme }) => theme.colors.greyLight01};
  border: none;
  border-radius: 0.6rem;
  resize: ${({ $type }) => ($type === "textarea" ? "vertical" : "unset")};
`;

export const StyledSelection = styled.select`
  cursor: pointer;
  width: 100%;
  padding: 1rem 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.greyDark01};
  background-color: ${({ theme }) => theme.colors.greyLight01};
  border: none;
  border-radius: 0.6rem;
`;

export const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.greyDark03};
`;

export const StyledButtonUpload = styled.label`
  cursor: pointer;
  display: inline-block;
  padding: 0.8rem 1.2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.greyDark01};
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover {
    background-color: ${({ theme }) => darken(0.2, theme.colors.aqua)};
  }
`;

export const ImageSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    & > *:first-child {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      width: 8rem;
      font-weight: 400;
      font-size: 1.2rem;
    }
  }

  & > *:not(:last-child) {
    margin-right: 1rem;
  }

  & > * {
    display: flex;
  }
`;

export const ImageUrl = styled.div`
  @media (max-width: ${mobile}em) {
    label {
      display: inline-block;
      margin-bottom: 1rem;
    }
  }
`;

export const ImageUpload = styled.div`
  @media (max-width: ${mobile}em) {
    label {
      margin-right: 1rem;
    }
  }
`;

export const Rating = styled.div`
  width: 25rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export const Favorite = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const Price = styled.div`
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: ${mobile}em) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const ButtonSet = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${mobile}em) {
    gap: 1rem;

    button {
      width: 100%;
    }
  }
`;

export const StyledIcon = styled(Icon)<{ $isFavorite: boolean }>`
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  fill: ${({ theme, $isFavorite }) => ($isFavorite ? theme.colors.aqua : theme.colors.greyLight01)};
  stroke: none;
  transition: ${({ theme }) => theme.transitions.fastInOut};

  &:hover,
  &:focus-visible {
    fill: ${({ theme }) => theme.colors.aqua};
  }
`;
