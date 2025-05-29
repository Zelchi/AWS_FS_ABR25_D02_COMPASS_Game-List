import { ReactNode } from "react";

interface DialogContentProps {
  children: ReactNode;
}

export function DialogContent({ children }: DialogContentProps) {
  return <div className="mt-4">{children}</div>;
}

