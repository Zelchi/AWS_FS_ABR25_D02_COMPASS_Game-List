import FeatureCard from "@/components/global/FeatureCard";
import ControllerIcon from "@/assets/controller-outline.svg?react";
import TagIcon from "@/assets/tag-outline.svg?react";
import ChipIcon from "@/assets/chip-outline.svg?react";
import { IStatistics } from "@/types/types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 30em) {
    gap: 1rem;
  }
`;

type ShortcutCardsProps = {
  data: IStatistics | undefined;
  className?: string;
};

export function ShortcutCards({ data, className }: ShortcutCardsProps) {
  return (
    <Container className={className}>
      <FeatureCard icon={<ControllerIcon />} title="Games" qty={data?.totalGames} />
      <FeatureCard icon={<TagIcon />} title="Categories" qty={data?.totalGames} />
      <FeatureCard icon={<ChipIcon />} title="Platforms" qty={data?.totalPlatforms} />
    </Container>
  );
}
