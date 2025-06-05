import React from "react";
import { FavoriteContainer } from "@/components/data/filter/styles";
import { FilterBarProps } from "@/components/data/filter/types";
import FilterSelection from "@/components/data/filter/fields/FilterSelection";

export default function FilterBarFallback({ data, favoriteIcon }: FilterBarProps) {
  return (
    <>
      <FilterSelection data={data} />
      <FavoriteContainer>
        <span>Favorite?</span>
        {favoriteIcon}
      </FavoriteContainer>
    </>
  );
}
