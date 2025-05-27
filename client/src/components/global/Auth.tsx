import React from "react";
import { Outlet } from "react-router-dom";

export function Auth({ onLogin }: { onLogin: () => void }): React.JSX.Element {
  return (
    <div>
      <Outlet />
    </div>
  );
}
