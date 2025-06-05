import ControllerIcon from "@/assets/icons/controller.svg?react";
import TagIcon from "@/assets/icons/tag.svg?react";
import ChipIcon from "@/assets/icons/chip.svg?react";
import { TStatistics } from "@/types/types";
import styled from "styled-components";
import Shortcut from "./Shortcut";

type ShortcutsContainerProps = {
  data: TStatistics | undefined;
  className?: string;
};

export function ShortcutsContainer({ data, className }: ShortcutsContainerProps) {
  return (
    <Container className={className}>
      <Shortcut icon={ControllerIcon} title="Games" qty={data?.totalGames} />
      <Shortcut icon={TagIcon} title="Categories" qty={data?.totalGames} />
      <Shortcut icon={ChipIcon} title="Platforms" qty={data?.totalPlatforms} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 30em) {
    gap: 1rem;
  }
`;