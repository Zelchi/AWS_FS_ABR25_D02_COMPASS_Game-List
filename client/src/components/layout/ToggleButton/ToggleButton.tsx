import ToggleIcon from "@/assets/icons/toggle-outline.svg?react";
import Icon from "@/components/image/Icon/Icon";
import { StyledButton } from "@/components/layout/ToggleButton/styles";

export default function ToggleButton({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  return (
    <StyledButton onClick={onOpen} $isOpen={isOpen}>
      <Icon icon={ToggleIcon} />
    </StyledButton>
  );
}
