import styled from "styled-components";
import React from "react";
import FilterBar from "@/components/global/FilterBar";
import SearchBar from "@/components/global/SearchBar";
import ClearButton from "@/components/global/ClearButton";
import { useMediaQuery } from "react-responsive";
import { useGlobal } from "@/contexts/globalContext";

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
      {isLaptop ? (
        <>
          <SearchBar onLoadItems={onLoadItems} />
          <FilterBar header={header} onLoadItems={onLoadItems} />
        </>
      ) : (
        <>
          <FilterBar header={header} onLoadItems={onLoadItems} />
          <SearchBar onLoadItems={onLoadItems} />
          <ClearButton onLoadItems={onLoadItems} />
        </>
      )}
    </Container>
  );
}
