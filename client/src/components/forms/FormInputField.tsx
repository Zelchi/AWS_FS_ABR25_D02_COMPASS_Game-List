import React, { ReactNode } from "react";
import styled from "styled-components";

type InputType = {
  children: ReactNode;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (arg: string) => void;
  required?: boolean;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-01);
`;

const Input = styled.input`
  padding: 1.5rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.2rem;
  color: var(--color-grey-dark-01);
  border-radius: 0.4rem;
  border: 0.1rem solid var(--color-grey-light-01);

  &::placeholder {
    color: var(--color-grey-light-02);
  }

  &:focus {
    box-shadow: 0 0.2rem 1.2rem var(--color-aqua);
  }
`;

export function FormInputField({
  children,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  required = true,
}: InputType) {
  return (
    <Container>
      <Label htmlFor={name}>{children}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChange(e.target.value)}
        required={required}
      />
    </Container>
  );
}
