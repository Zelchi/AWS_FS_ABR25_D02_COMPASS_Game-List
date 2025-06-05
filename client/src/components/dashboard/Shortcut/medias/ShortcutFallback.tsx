import React from "react";
import {
  StyledIcon,
  Number,
  Type,
  Wrapper,
  StyledButton,
} from "@/components/dashboard/Shortcut/styles";
import { ShortcutProps } from "@/components/dashboard/Shortcut/types";
import Icon from "@/components/image/Icon/Icon";

export default function ShortcutFallback({ icon, plusIcon, qty, title, onClick }: ShortcutProps) {
  return (
    <>
      <StyledIcon icon={icon} />
      <Number>{qty}</Number>
      <Wrapper>
        <Type>{title}</Type>
        <StyledButton variant="shortcut" onClick={onClick}>
          <Icon icon={plusIcon!} /> Add new
        </StyledButton>
      </Wrapper>
    </>
  );
}
