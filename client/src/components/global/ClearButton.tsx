import styled from "styled-components";
import Button from "@/components/global/Button";
import CloseIcon from "@/assets/close.svg?react";
import React from "react";

const CloseIconWrapper = styled.span`
  width: 1.2rem;
  display: inline-block;
  fill: var(--color-white);
`;

export default function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <Button size="medium" variant="secondary" onClick={onClick}>
      Clear
      <CloseIconWrapper>
        <CloseIcon />
      </CloseIconWrapper>
    </Button>
  );
}
