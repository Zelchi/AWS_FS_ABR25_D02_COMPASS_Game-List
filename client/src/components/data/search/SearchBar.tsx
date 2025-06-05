import React from "react";
import { useLocation } from "react-router-dom";
import SearchIcon from "@/assets/icons/search-outline.svg?react";
import Button from "@/components/button/Button";
import ClearButton from "@/components/data/clear/ClearButton";
import { Input, SearchForm, StyledIcon } from "@/components/data/search/styles";
import { useGlobal } from "@/contexts/globalContext";
import { routes } from "@/routes/routes";

export default function SearchBar({ onLoadItems }: { onLoadItems: () => Promise<void> }) {
  const { search, handleSearch } = useGlobal();
  const { isMobile } = useGlobal();
  const path = useLocation().pathname;

  return (
    <SearchForm
      onSubmit={(e) => {
        e.preventDefault();
        void onLoadItems();
      }}
      $path={path}
    >
      <Input
        value={search}
        onChange={handleSearch}
        placeholder={`Search ${routes.find((route) => route.path === path)?.singular}...`}
      ></Input>
      <Button size="medium" type="submit">
        Search <StyledIcon icon={SearchIcon} />
      </Button>
      {path !== "/Games" && isMobile && <ClearButton onLoadItems={onLoadItems} />}
    </SearchForm>
  );
}
