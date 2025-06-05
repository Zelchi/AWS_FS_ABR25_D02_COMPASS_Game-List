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

export default function ShortcutLaptop({ icon, plusIcon, qty, title }: ShortcutProps) {
  return (
    <>
      <Wrapper>
        <StyledIcon icon={icon}></StyledIcon>
        <Type>{title}</Type>
        <Number>{qty}</Number>
      </Wrapper>
      <StyledButton variant="shortcut">
        <Icon icon={plusIcon!} /> Add new
      </StyledButton>
    </>
  );
}
