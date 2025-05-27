import React, { ReactNode, useState } from "react";
import { Logo } from "@/components/global/Logo";
import { LoginForm } from "@/components/login/LoginForm";

type LoginType = {
  children: ReactNode;
  isRegistered: boolean;
  onRegister: () => void;
};

export function LoginBox({ children, isRegistered, onRegister }: LoginType): React.JSX.Element {
  return (
    <div className="login-box">
      <Logo />
      <h1>{isRegistered ? "Login" : "Sign Up"}</h1>
      <p>
        {isRegistered
          ? "Enter your credentials to access your account"
          : "Register yourself to access the system"}
      </p>
      {children}
      <p>
        {isRegistered ? "Don't have" : "Already have"} an account?{" "}
        <button onClick={onRegister}>{isRegistered ? "Register" : "Login"} now</button>
      </p>
    </div>
  );
}
