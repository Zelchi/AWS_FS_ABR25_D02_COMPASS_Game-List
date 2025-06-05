import styled from "styled-components";
import React, { ReactNode } from "react";
import SortIconFilled from "@/assets/icons/sort-active-outline.svg?react";
import SortIcon from "@/assets/icons/sort-outline.svg?react";
import { useGlobal } from "@/contexts/globalContext";

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  background: none;
  border: none;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--color-grey-03);
  transition: var(--transition);

  &:hover,
  &:focus {
    color: var(--color-aqua);

    svg {
      fill: var(--color-aqua);
    }
  }
`;

const SortIconWrapper = styled.span<{ $asc?: boolean }>`
  width: 1.2rem;
  display: inline-block;
  fill: var(--color-aqua);
  transform: ${({ $asc }) => ($asc ? "" : "rotate(180deg)")};
  transition: var(--transition);
`;

export default function SortButton({ children, head }: { children: ReactNode; head: string }) {
  const { sortBy, sortOrder, handleSortByAndOrder } = useGlobal();

  return (
    <Button value={head} onClick={handleSortByAndOrder}>
      {children}{" "}
      {sortBy === head ? (
        <SortIconWrapper $asc={sortOrder === "asc"}>
          <SortIconFilled />
        </SortIconWrapper>
      ) : (
        <SortIconWrapper>
          <SortIcon />
        </SortIconWrapper>
      )}
    </Button>
  );
}
