import React from "react";
import ControllerIcon from "@/assets/icons/controller.svg?react";
import TagIcon from "@/assets/icons/tag.svg?react";
import ChipIcon from "@/assets/icons/chip.svg?react";
import { TStatistics } from "@/types/types";
import ShortcutItem from "./ShortcutItem";
import { GroupContainer } from "@/components/dashboard/Shortcut/styles";
import { useModal } from "@/contexts/modalContext";

type ShortcutsContainerProps = {
  data: TStatistics | undefined;
  className?: string;
};

export function Shortcut({ data, className }: ShortcutsContainerProps) {
  const { handleModalContent } = useModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const previous = (e.currentTarget as HTMLElement).previousElementSibling;
    const title = previous?.textContent;

    if (title === "Games") {
      handleModalContent("/games", {});
    }
    if (title === "Categories") {
      handleModalContent("/categories", {});
    }
    if (title === "Platforms") {
      handleModalContent("/platforms", {});
    }
  };

  return (
    <GroupContainer className={className}>
      <ShortcutItem
        icon={ControllerIcon}
        title="Games"
        qty={data?.totalGames}
        onClick={handleClick}
      />
      <ShortcutItem
        icon={TagIcon}
        title="Categories"
        qty={data?.totalGames}
        onClick={handleClick}
      />
      <ShortcutItem
        icon={ChipIcon}
        title="Platforms"
        qty={data?.totalPlatforms}
        onClick={handleClick}
      />
    </GroupContainer>
  );
}
