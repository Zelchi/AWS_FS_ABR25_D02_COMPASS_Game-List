import React from "react";
import { useNavigate } from "react-router-dom";

type LoginFormType = {
  isRegistered: boolean;
  onRegister: () => void;
  onLogin: () => void;
};

export function LoginForm({ isRegistered, onRegister, onLogin }: LoginFormType): React.JSX.Element {
  const navigate = useNavigate();

  const handleLogin: () => void = (): void => {
    onLogin();
    alert("Successfuly Logged In!");
    navigate("/");
  };

  const handleRegister: () => void = (): void => {
    alert("Successfuly Registered!");
    onRegister();
  };

  return (
    <form onSubmit={isRegistered ? handleLogin : handleRegister}>
      {!isRegistered && (
        <>
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" placeholder="Juan Gustavo" />
        </>
      )}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder={isRegistered ? "Enter your email" : "email@email.com"}
      />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" placeholder="Enter your password" />
      {!isRegistered && (
        <>
          <label htmlFor="password-confirmation">Confirm Password</label>
          <input id="password-confirmation" type="password" placeholder="Enter your password" />
        </>
      )}
      <button type="submit">{isRegistered ? "Login" : "Sign Up"}</button>
    </form>
  );
}
