import ControllerIcon from "@/assets/icons/controller.svg?react";
import TagIcon from "@/assets/icons/tag.svg?react";
import ChipIcon from "@/assets/icons/chip.svg?react";
import { TStatistics } from "@/types/types";
import ShortcutItem from "./ShortcutItem";
import { GroupContainer } from "@/components/dashboard/Shortcut/styles";

type ShortcutsContainerProps = {
  data: TStatistics | undefined;
  className?: string;
};

export function Shortcut({ data, className }: ShortcutsContainerProps) {
  return (
    <GroupContainer className={className}>
      <ShortcutItem icon={ControllerIcon} title="Games" qty={data?.totalGames} />
      <ShortcutItem icon={TagIcon} title="Categories" qty={data?.totalGames} />
      <ShortcutItem icon={ChipIcon} title="Platforms" qty={data?.totalPlatforms} />
    </GroupContainer>
  );
}
