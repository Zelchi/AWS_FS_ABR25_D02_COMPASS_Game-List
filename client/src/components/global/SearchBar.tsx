import styled from "styled-components";
import SearchIcon from "../../assets/search.svg?react";
import Button from "@/components/global/Button";
import React from "react";

const SearchContainer = styled.form`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  width: 21.2rem;
  padding: 0.8rem 1.4rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.2rem;
  color: var(--color-black);
  border-radius: 0.4rem;
  border: none;

  &::placeholder {
    color: var(--color-grey-light-05);
  }

  @media (max-width: 30em) {
    width: 100%;
  }
`;

const SearchIconWrapper = styled.span`
  width: 1.4rem;
  display: inline-block;
  fill: var(--color-white);
`;

export default function SearchBar({
  search,
  onSearch,
  onRequest,
}: {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequest?: () => Promise<void>;
}) {
  return (
    <SearchContainer
      onSubmit={(e) => {
        e.preventDefault();
        onRequest?.();
      }}
    >
      <Input value={search} onChange={onSearch} placeholder="Search game"></Input>
      <Button size="medium" type="submit">
        Search
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </Button>
    </SearchContainer>
  );
}
