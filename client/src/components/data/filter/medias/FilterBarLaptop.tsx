import React from "react";
import ClearButton from "@/components/data/clear/ClearButton";
import FilterSelection from "@/components/data/filter/fields/FilterSelection";
import SortSelection from "@/components/data/filter/fields/SortSelection";
import FavoriteSelection from "@/components/data/filter/fields/FavoriteSelection";
import { FavoriteAndClearWrapper } from "@/components/data/filter/styles";
import { FilterBarProps } from "@/components/data/filter/types";

export default function FilterBarLaptop({ header, data, favoriteIcon }: FilterBarProps) {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <FilterSelection data={data} />
        <SortSelection header={header!} />
      </div>
      <FavoriteAndClearWrapper>
        <FavoriteSelection favoriteIcon={favoriteIcon} />
        <ClearButton />
      </FavoriteAndClearWrapper>
    </>
  );
}
