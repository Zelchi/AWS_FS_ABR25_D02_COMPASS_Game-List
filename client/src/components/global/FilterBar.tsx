import React from "react";
import styled from "styled-components";
import Checkbox from "@/components/global/Checkbox";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FavoriteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    display: inline-block;
    color: var(--color-white);
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1;
    font-family: var(--font-primary);
  }
`;

const SelectInput = styled.select`
  padding: 0.8rem 1.4rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.2rem;
  color: "var(--color-black)";
  border-radius: 0.4rem;
  border: none;

  option:disabled {
    color: var(--color-grey-light-05);
  }
`;

type FilterBarType = {
  filter: string;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isFavorite: boolean;
  onFavorite: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FilterBar({ filter, onFilter, isFavorite, onFavorite }: FilterBarType) {
  // `/api/v1/${filter}/page`

  // DADOS DA API ABAIXO - FICTÍCIOS POR ENQUANTO
  const data = ["RPG", "Action", "Adventure"];

  return (
    <Container>
      <FilterContainer>
        <SelectInput value={filter} onChange={onFilter}>
          <option value="" disabled>
            Filter by
          </option>
          <option value="category">Category</option>
          <option value="platform">Platform</option>
          <option value="status">Status</option>
        </SelectInput>
        {filter && (
          <SelectInput>
            {data.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        )}
      </FilterContainer>
      <FavoriteContainer>
        <span>Favorite?</span>
        <Checkbox isFavorite={isFavorite} onFavorite={onFavorite} />
      </FavoriteContainer>
    </Container>
  );
}
