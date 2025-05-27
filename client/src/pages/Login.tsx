import { LoginBox } from "@/components/login/LoginBox";
import React, { useState } from "react";
import { LoginForm } from "@/components/login/LoginForm";

export default function Login({ onLogin }: { onLogin: () => void }): React.JSX.Element {
  const [isRegistered, setIsRegistered] = useState(true);

  const handleIsRegistered: () => void = (): void => {
    setIsRegistered((is: boolean): boolean => !is);
  };

  return (
    <LoginBox isRegistered={isRegistered} onRegister={handleIsRegistered}>
      <LoginForm isRegistered={isRegistered} onRegister={handleIsRegistered} onLogin={onLogin} />
    </LoginBox>
  );
}
