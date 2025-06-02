import styled from "styled-components";
import React from "react";
import FilterBar from "@/components/global/FilterBar";
import SearchBar from "@/components/global/SearchBar";
import ClearButton from "@/components/global/ClearButton";
import { useMediaQuery } from "react-responsive";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;

  @media (max-width: 67em) {
    flex-direction: column;
    gap: 1rem;
  }
  @media (max-width: 30em) {
    gap: 2rem;
  }
`;

type FilterAndSearchBarProps = {
  filter: string;
  labels: { [key: string]: string };
  header: string[];
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
  sortBy: string;
  onSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: string;
  onSortOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isFavorite: boolean;
  onFavorite: () => void;
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequest?: () => Promise<void>;
  onClear: () => void;
};

export default function FilterAndSearchBar({
  filter,
  labels,
  header,
  onFilter,
  sortBy,
  onSortBy,
  sortOrder,
  onSortOrder,
  selected,
  onSelected,
  isFavorite,
  onFavorite,
  search,
  onSearch,
  onRequest,
  onClear,
}: FilterAndSearchBarProps) {
  const isLaptop = useMediaQuery({ maxWidth: 67 * 16 });

  return (
    <Container>
      {isLaptop ? (
        <>
          <SearchBar search={search} onSearch={onSearch} onRequest={onRequest} onClick={() => {}} />
          <FilterBar
            filter={filter}
            labels={labels}
            header={header}
            sortBy={sortBy}
            onSortBy={onSortBy}
            sortOrder={sortOrder}
            onSortOrder={onSortOrder}
            selected={selected}
            isFavorite={isFavorite}
            onFilter={onFilter}
            onSelected={onSelected}
            onFavorite={onFavorite}
            onClear={onClear}
          />
        </>
      ) : (
        <>
          <FilterBar
            filter={filter}
            labels={labels}
            header={header}
            sortBy={sortBy}
            onSortBy={onSortBy}
            sortOrder={sortOrder}
            onSortOrder={onSortOrder}
            selected={selected}
            isFavorite={isFavorite}
            onFilter={onFilter}
            onSelected={onSelected}
            onFavorite={onFavorite}
            onClear={onClear}
          />
          <SearchBar search={search} onSearch={onSearch} onRequest={onRequest} onClick={() => {}} />
          <ClearButton onClick={onClear} />
        </>
      )}
    </Container>
  );
}
