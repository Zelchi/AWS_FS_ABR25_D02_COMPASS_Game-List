import React, { Dispatch } from "react";
import styled from "styled-components";
import SearchBar from "@/components/global/SearchBar";
import ClearButton from "@/components/global/ClearButton";
import { useMediaQuery } from "react-responsive";

const SearchContainerEl = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 30em) {
    margin-bottom: 2rem;

    div {
      flex-direction: column;
    }
  }
`;

export default function SearchContainer({ onLoadItems }: { onLoadItems: () => Promise<void> }) {
  const isMobile = useMediaQuery({ maxWidth: 30 * 16 });

  return (
    <>
      {isMobile ? (
        <SearchContainerEl>
          <SearchBar onLoadItems={onLoadItems} />
        </SearchContainerEl>
      ) : (
        <SearchContainerEl>
          <SearchBar onLoadItems={onLoadItems} />
          <ClearButton onLoadItems={onLoadItems} />
        </SearchContainerEl>
      )}
    </>
  );
}
