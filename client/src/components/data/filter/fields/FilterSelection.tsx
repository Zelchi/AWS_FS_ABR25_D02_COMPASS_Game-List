import React from "react";
import { SelectContainer as Container } from "@/components/data/filter/styles";
import { filterDictionary } from "@/components/data/filter/types";
import { useGlobal } from "@/contexts/globalContext";
import { Select } from "@/components/forms/Fields/styles";

export default function FilterSelection({
  data,
}: {
  data: {
    id: string;
    name: string;
  }[];
}) {
  const { filters, selectedFilter, handleFilters, handleSelectedFilter } = useGlobal();

  return (
    <Container>
      <Select value={filters} onChange={handleFilters}>
        <option value="" disabled>
          Filter by
        </option>
        {Object.entries(filterDictionary).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </Select>

      {filters && (
        <Select onChange={handleSelectedFilter} value={selectedFilter}>
          <option value="" disabled>
            Choose an option
          </option>
          {data.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
      )}
    </Container>
  );
}
