import styled from "styled-components";
import React, { ReactNode } from "react";
import SortIconFilled from "@/assets/sort-filled.svg?react";
import SortIcon from "@/assets/sort.svg?react";

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

export default function SortButton({
  children,
  onClick,
  sortBy,
  sortOrder,
  head,
}: {
  children: ReactNode;
  head: string;
  sortBy?: string;
  sortOrder: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button value={head} onClick={onClick}>
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
