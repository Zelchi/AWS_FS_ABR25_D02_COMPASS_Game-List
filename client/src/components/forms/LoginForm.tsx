import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormInputField } from "@/components/forms/FormInputField";
import Button from "@/components/global/Button";

type LoginFormType = {
  isRegistered: boolean;
  onRegister: () => void;
  onLogin: () => void;
};

const Form = styled.form`
  width: 41.5rem;
  margin-bottom: 2.8rem;
  display: grid;
  row-gap: 1.5rem;

  @media (max-width: 48em) {
    width: 100%;
  }
`;

const Invalid = styled.p`
  font-family: var(--font-primary);
  text-align: right;
  font-size: 1.4rem;
  color: var(--color-red);
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 2.4rem;
`;

export function LoginForm({ isRegistered, onRegister, onLogin }: LoginFormType): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleLogin: () => void = (): void => {
    onLogin();
    alert("Successfully Logged In!");
    navigate("/");
  };

  const handleRegister: () => void = (): void => {
    alert("Successfully Registered!");
    onRegister();
  };

  return (
    <Form onSubmit={isRegistered ? handleLogin : handleRegister}>
      {!isRegistered && (
        <FormInputField
          type="text"
          name="name"
          value={name}
          onChange={setName}
          placeholder="Juan Gustavo"
        >
          Full Name
        </FormInputField>
      )}

      <FormInputField
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
        placeholder={isRegistered ? "Enter your email" : "email@email.com"}
      >
        Email
      </FormInputField>
      <FormInputField
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
      >
        Password
      </FormInputField>

      {!isRegistered && (
        <>
          <FormInputField
            type="password"
            name="password-confirmation"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            placeholder="Enter your password"
          >
            Confirm Password
          </FormInputField>
          {passwordConfirmation && passwordConfirmation !== password && (
            <Invalid>Passwords do not match!</Invalid>
          )}
        </>
      )}
      <ButtonContainer>
        <Button type="submit">{isRegistered ? "Login" : "Sign Up"}</Button>
      </ButtonContainer>
    </Form>
  );
}
