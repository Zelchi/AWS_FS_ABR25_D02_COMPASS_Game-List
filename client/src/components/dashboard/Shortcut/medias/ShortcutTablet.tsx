import React from "react";
import { StyledIcon, Number, Wrapper, StyledButton } from "@/components/dashboard/Shortcut/styles";
import { ShortcutProps } from "@/components/dashboard/Shortcut/types";
import Icon from "@/components/image/Icon/Icon";
import { routes } from "@/routes/routes";

export default function ShortcutTablet({ icon, plusIcon, qty, title, onClick }: ShortcutProps) {
  return (
    <>
      <StyledIcon icon={icon}></StyledIcon>
      <Number>{qty}</Number>
      <StyledButton variant="shortcut" onClick={onClick}>
        <span>
          <Icon icon={plusIcon!} /> Add
        </span>
        {routes.find((route) => route.path.slice(1) === title)?.singular}
      </StyledButton>
    </>
  );
}
