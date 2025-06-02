import styled from "styled-components";
import Button from "@/components/global/Button";
import CloseIcon from "@/assets/close.svg?react";
import React from "react";
import { useGlobal } from "@/contexts/globalContext";

const CloseIconWrapper = styled.span`
  width: 1.2rem;
  display: inline-block;
  fill: var(--color-white);
`;

const ButtonWrapper = styled.div`
  & > * {
    width: 100%;
    height: 100%;
  }
`;

export default function ClearButton({ onLoadItems }: { onLoadItems: () => Promise<void> }) {
  const { handleClear } = useGlobal();

  return (
    <ButtonWrapper>
      <Button
        size="medium"
        variant="secondary"
        onClick={async () => {
          await handleClear();
          await onLoadItems();
        }}
      >
        Clear
        <CloseIconWrapper>
          <CloseIcon />
        </CloseIconWrapper>
      </Button>
    </ButtonWrapper>
  );
}
