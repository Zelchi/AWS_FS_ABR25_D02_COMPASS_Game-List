import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import { Form, StyledInput, Label, InvalidMessage } from "@/components/forms/LoginForm/styles";
import API from "@/utils/API";
import { toast } from "react-toastify";

type LoginFormType = {
  isRegistered: boolean;
  onRegister: () => void;
};

export function LoginForm({ isRegistered, onRegister }: LoginFormType): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e) => {
    e.preventDefault();

    try {
      const { status, data, errors } = await API.POST("/account/log", {
        email,
        password,
      });

      if (status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        navigate("/");
      }

      if (status === 400) {
        toast.error("Invalid credentials! Please try again.");
      }

    } catch (err) {
      console.error(err);
      toast.error(err.response.data.error || "An error occurred during login. Please try again.");
    }
  };

  const handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) return;

    try {
      const { status } = await API.POST("/account/reg", {
        name,
        email,
        password,
      });

      if (status === 201) {
        toast.success("Successfully Registered!");

        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");

        onRegister();
      }
    } catch (err) {
      toast.error(err.response.data.error || "Registration failed! Please try again.");
    }
  };

  return (
    <Form onSubmit={isRegistered ? handleLogin : handleRegister}>
      {!isRegistered && (
        <>
          <Label htmlFor="name">Full Name</Label>
          <StyledInput
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Gustavo"
            required
          />
        </>
      )}

      <Label htmlFor="email">Email</Label>
      <StyledInput
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={isRegistered ? "Enter your email" : "email@email.com"}
        required
      />

      <Label htmlFor="password">Password</Label>
      <StyledInput
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />

      {!isRegistered && (
        <>
          <Label htmlFor="password-confirmation">Confirm Password</Label>
          <StyledInput
            type="password"
            name="password-confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {passwordConfirmation && passwordConfirmation !== password && (
            <InvalidMessage>Passwords do not match!</InvalidMessage>
          )}
        </>
      )}
      <Button type="submit" size="large" full upper>
        {isRegistered ? "Login" : "Sign Up"}
      </Button>
    </Form>
  );
}
