import styled from "styled-components";
import CloseIcon from "../../assets/close.svg?react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const CloseIconWrapper = styled.span`
  width: 1.2rem;
  display: inline-block;
  fill: var(--color-white);
`;

import React from "react";
import SearchBar from "@/components/global/SearchBar";
import FilterBar from "@/components/global/FilterBar";
import Button from "@/components/global/Button";

type FilterAndSearchBarProps = {
  filter: string;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
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
  onFilter,
  selected,
  onSelected,
  isFavorite,
  onFavorite,
  search,
  onSearch,
  onRequest,
  onClear,
}: FilterAndSearchBarProps) {
  return (
    <Container>
      <FilterBar
        filter={filter}
        selected={selected}
        isFavorite={isFavorite}
        onFilter={onFilter}
        onSelected={onSelected}
        onFavorite={onFavorite}
      />
      <SearchBar search={search} onSearch={onSearch} onRequest={onRequest} />
      <Button size="medium" variant="secondary" onClick={onClear}>
        Clear
        <CloseIconWrapper>
          <CloseIcon />
        </CloseIconWrapper>
      </Button>
    </Container>
  );
}
