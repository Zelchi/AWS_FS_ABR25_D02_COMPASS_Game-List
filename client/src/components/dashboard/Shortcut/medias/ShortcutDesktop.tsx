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

export default function ShortcutDesktop({ icon, plusIcon, qty, title }: ShortcutProps) {
  return (
    <>
      <Wrapper>
        <StyledIcon icon={icon} />
        <Type>{title}</Type>
      </Wrapper>
      <Number>{qty}</Number>
      <StyledButton variant="shortcut">
        <Icon icon={plusIcon!} />
        <span>
          <span>Add</span>
          <span>new</span>
        </span>
      </StyledButton>
    </>
  );
}
