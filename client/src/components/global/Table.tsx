import React, { Dispatch } from "react";
import styled from "styled-components";
import TableItem from "@/components/global/TableItem";
import SortIcon from "@/assets/sort.svg?react";
import SortIconFilled from "@/assets/sort-filled.svg?react";
import { EntityWithId } from "@/types/types";

type TableProps<T extends EntityWithId> = {
  data: T[];
  header: string[];
  labels: { [key: string]: string };
  sortBy: string;
  sortOrder: string;
  onSortByAndOrder: (e: React.MouseEvent<HTMLButtonElement>) => void;
  path: string;
  onItemsChange: Dispatch<React.SetStateAction<T[]>>;
  onClear?: () => void;
};

const TableRow = styled.tr``;

const SortIconWrapper = styled.span<{ $asc?: boolean }>`
  width: 1.2rem;
  display: inline-block;
  fill: var(--color-aqua);
  transform: ${({ $asc }) => ($asc ? "" : "rotate(180deg)")};
`;

export default function Table<T extends EntityWithId>({
  data,
  header,
  labels,
  sortBy,
  sortOrder,
  onSortByAndOrder,
  path,
  onItemsChange,
  onClear,
}: TableProps<T>) {
  const sorted = [...data].sort((a, b) => {
    const aValue = (a as any)[sortBy];
    const bValue = (b as any)[sortBy];

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <table>
      <thead>
        <TableRow>
          {header.map((head) => (
            <th key={head}>
              <button value={head} onClick={onSortByAndOrder}>
                {labels[head]}{" "}
                {sortBy === head ? (
                  <SortIconWrapper $asc={sortOrder === "asc"}>
                    <SortIconFilled />
                  </SortIconWrapper>
                ) : (
                  <SortIconWrapper>
                    <SortIcon />
                  </SortIconWrapper>
                )}
              </button>
            </th>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {sorted.map((item) => (
          <TableRow key={item.id}>
            {header.map((head) => (
              <TableItem<T> key={head} path={path} onItemsChange={onItemsChange} onClear={onClear}>
                {(item as any)[head] instanceof Date
                  ? (item as any)[head].toLocaleDateString()
                  : String((item as any)[head] ?? "")}
              </TableItem>
            ))}
          </TableRow>
        ))}
      </tbody>
    </table>
  );
}
