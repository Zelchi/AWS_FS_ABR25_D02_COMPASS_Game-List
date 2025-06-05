import { getLabel, isLabelKey } from "@/utils/labels";
import { SelectContainer as Container } from "@/components/data/filter/styles";
import React from "react";
import { useGlobal } from "@/contexts/globalContext";
import { Select } from "@/components/forms/Fields/styles";

export default function SortSelection({ header }: { header: string[] }) {
  const { sortBy, sortOrder, handleSortBy, handleSortOrder } = useGlobal();

  return (
    <Container>
      <Select onChange={handleSortBy} value={sortBy}>
        <option value="" disabled>
          Sort by
        </option>
        {["updatedAt", ...header!].map((head) => (
          <option key={head} value={head}>
            {isLabelKey(head) ? getLabel(head) : ""}
          </option>
        ))}
      </Select>
      {sortBy && (
        <Select onChange={handleSortOrder} value={sortOrder}>
          <option value="" disabled>
            Choose an option
          </option>
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Descending</option>
        </Select>
      )}
    </Container>
  );
}
