import React from "react";
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

type SearchContainerProps = {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequest?: () => Promise<void>;
  onClick: () => void;
};

export default function SearchContainer({
  search,
  onSearch,
  onRequest,
  onClick,
}: SearchContainerProps) {
  const isMobile = useMediaQuery({ maxWidth: 30 * 16 });

  return (
    <>
      {isMobile ? (
        <SearchContainerEl>
          <SearchBar search={search} onSearch={onSearch} onRequest={onRequest} />
        </SearchContainerEl>
      ) : (
        <SearchContainerEl>
          <SearchBar search={search} onSearch={onSearch} onRequest={onRequest} />
          <ClearButton onClick={onClick} />
        </SearchContainerEl>
      )}
    </>
  );
}
