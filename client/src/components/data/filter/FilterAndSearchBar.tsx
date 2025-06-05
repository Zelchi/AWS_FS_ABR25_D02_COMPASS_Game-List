import React from "react";
import ClearButton from "@/components/data/clear/ClearButton";
import SearchBar from "@/components/data/search/SearchBar";
import { FilterAndSearchBarContainer as Container } from "@/components/data/filter/styles";
import { useGlobal } from "@/contexts/globalContext";
import FilterBar from "@/components/data/filter/FilterBar";

export default function FilterAndSearchBar({
  header,
  onLoadItems,
}: {
  header: string[];
  onLoadItems: () => Promise<void>;
}) {
  const { isLaptop } = useGlobal();

  return (
    <Container>
      <FilterBar header={header} onLoadItems={onLoadItems} />
      <SearchBar onLoadItems={onLoadItems} />
      {!isLaptop && <ClearButton onLoadItems={onLoadItems} />}
    </Container>
  );
}
