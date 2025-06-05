import React, { useEffect, useState } from "react";
import { sortItems } from "@/utils/sortItems";
import { useGlobal } from "@/contexts/globalContext";
import { StyledTable } from "@/components/table/styles";
import TableHead from "@/components/table/TableHead";
import TableBody from "@/components/table/TableBody";

type TableProps<T> = {
  data: T[];
  header: string[];
};

export default function Table<T extends Record<string, any>>({ data, header }: TableProps<T>) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleData, setVisibleData] = useState(data);
  const { isLaptop, games, categories, platforms } = useGlobal();
  const tableTransitionDuration = 600;

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, tableTransitionDuration);

    return () => clearTimeout(timeout);
  }, [games, categories, platforms]);

  useEffect(() => {
    setIsAnimating(true);

    const timeout = setTimeout(() => {
      setIsAnimating(false);
      setVisibleData(data);
    }, tableTransitionDuration);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <StyledTable $isAnimating={isAnimating} $transitionDuration={tableTransitionDuration}>
      {!isLaptop && <TableHead header={header} />}
      <TableBody
        data={visibleData}
        header={header}
        isAnimating={isAnimating}
        transitionDuration={tableTransitionDuration}
      />
    </StyledTable>
  );
}
