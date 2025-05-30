import { ReactNode } from "react";

interface DialogTitleProps {
  children: ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}
