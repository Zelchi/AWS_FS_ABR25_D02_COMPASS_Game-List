import React from "react";
import ClearButton from "@/components/data/clear/ClearButton";
import FilterSelection from "@/components/data/filter/fields/FilterSelection";
import SortSelection from "@/components/data/filter/fields/SortSelection";
import FavoriteSelection from "@/components/data/filter/fields/FavoriteSelection";
import { FilterBarProps } from "@/components/data/filter/types";

export default function FilterBarMobile({ header, data, favoriteIcon }: FilterBarProps) {
  return (
    <>
      <FilterSelection data={data} />
      <SortSelection header={header!} />
      <FavoriteSelection favoriteIcon={favoriteIcon} />
      <ClearButton />
    </>
  );
}
