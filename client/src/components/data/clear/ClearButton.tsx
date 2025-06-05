import styled from "styled-components";
import Button from "@/components/button/Button";
import CloseIcon from "@/assets/icons/close.svg?react";
import { useEffect, useState } from "react";
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
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      onLoadItems();
      setCleared(false);
    }
  }, [cleared, onLoadItems]);

  return (
    <ButtonWrapper>
      <Button
        size="medium"
        variant="secondary"
        onClick={() => {
          handleClear();
          setCleared(true);
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
