import styled from "styled-components";
import SearchIcon from "../../assets/search.svg?react";
import Button from "@/components/global/Button";
import React from "react";
import { useMediaQuery } from "react-responsive";
import ClearButton from "@/components/global/ClearButton";
import { useLocation } from "react-router-dom";

const SearchContainer = styled.form<{ $path: string }>`
  display: flex;
  gap: 1rem;

  @media (max-width: 67em) {
    & > * {
      width: ${({ $path }) => ($path === "/games" ? "100%" : "calc(50% - 0.5rem)")};
    }
  }

  @media (max-width: 30em) {
    flex-wrap: wrap;
  }
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

  &:focus {
    box-shadow: 0 0.2rem 1.2rem var(--color-aqua);
  }

  @media (max-width: 67em) {
    width: 100%;
  }

  @media (max-width: 30em) {
    flex-shrink: 0;
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
  onClick,
}: {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequest?: () => Promise<void>;
  onClick: () => void;
}) {
  const isMobile = useMediaQuery({ maxWidth: 30 * 16 });
  const path = useLocation().pathname;

  return (
    <SearchContainer
      onSubmit={(e) => {
        e.preventDefault();
        onRequest?.();
      }}
      $path={path}
    >
      {isMobile ? (
        <>
          <Input value={search} onChange={onSearch} placeholder="Search game"></Input>
          <Button size="medium" type="submit">
            Search
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Button>
          {path !== "/games" && <ClearButton onClick={onClick}></ClearButton>}
        </>
      ) : (
        <>
          <Input value={search} onChange={onSearch} placeholder="Search game"></Input>
          <Button size="medium" type="submit">
            Search
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Button>{" "}
        </>
      )}
    </SearchContainer>
  );
}
