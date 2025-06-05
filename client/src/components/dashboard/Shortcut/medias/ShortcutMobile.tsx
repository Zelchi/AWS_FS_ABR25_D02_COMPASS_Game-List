import React from "react";
import { StyledIcon, Number, Wrapper, StyledButton } from "@/components/dashboard/Shortcut/styles";
import { ShortcutProps } from "@/components/dashboard/Shortcut/types";
import Icon from "@/components/image/Icon/Icon";

export default function ShortcutMobile({ icon, plusIcon, qty, onClick }: ShortcutProps) {
  return (
    <>
      <Wrapper>
        <Number>{qty}</Number>
        <StyledIcon icon={icon} />
      </Wrapper>
      <StyledButton variant="shortcut" onClick={onClick}>
        <Icon icon={plusIcon!} />
      </StyledButton>
    </>
  );
}
