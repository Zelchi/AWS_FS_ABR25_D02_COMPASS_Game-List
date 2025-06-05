import React from "react";
import { StyledIcon, Number, Wrapper, StyledButton } from "@/components/dashboard/Shortcut/styles";
import { ShortcutProps } from "@/components/dashboard/Shortcut/types";
import Icon from "@/components/image/Icon/Icon";

export default function ShortcutTablet({ icon, plusIcon, qty, title }: ShortcutProps) {
  return (
    <>
      <Wrapper>
        <StyledIcon icon={icon}></StyledIcon>
        <Number>{qty}</Number>
      </Wrapper>
      <StyledButton>
        <span>
          <Icon icon={plusIcon!} /> Add
        </span>{" "}
        {title}
      </StyledButton>
    </>
  );
}
