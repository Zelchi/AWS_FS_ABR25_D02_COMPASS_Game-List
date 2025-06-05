import { useEffect, useState } from "react";
import CloseIcon from "@/assets/icons/close.svg?react";
import Button from "@/components/button/Button";
import { StyledIcon } from "@/components/data/clear/styles";
import { useGlobal } from "@/contexts/globalContext";

export default function ClearButton({ onLoadItems }: { onLoadItems: () => Promise<void> }) {
  const { handleClear } = useGlobal();
  const [cleared, setCleared] = useState(false);

  const handleClick = () => {
    handleClear();
    setCleared(true);
  };

  useEffect(() => {
    if (cleared) {
      onLoadItems();
      setCleared(false);
    }
  }, [cleared, onLoadItems]);

  return (
    <Button size="medium" variant="secondary" onClick={handleClick}>
      Clear <StyledIcon icon={CloseIcon} />
    </Button>
  );
}
