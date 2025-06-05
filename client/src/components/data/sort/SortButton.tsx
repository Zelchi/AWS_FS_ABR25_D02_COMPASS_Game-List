import React, { ReactNode } from "react";
import SortActiveIcon from "@/assets/icons/sort-active-outline.svg?react";
import SortIcon from "@/assets/icons/sort-outline.svg?react";
import { useGlobal } from "@/contexts/globalContext";
import { Button, StyledIcon } from "@/components/data/sort/styles";

export default function SortButton({ children, head }: { children: ReactNode; head: string }) {
  const { sortBy, sortOrder, handleSortByAndOrder } = useGlobal();

  return (
    <Button value={head} onClick={handleSortByAndOrder}>
      {children}{" "}
      {sortBy === head ? (
        <StyledIcon icon={SortActiveIcon} $asc={sortOrder === "desc"} />
      ) : (
        <StyledIcon icon={SortIcon} />
      )}
    </Button>
  );
}
