import React, { useEffect, useState } from "react";
import FilterBarMobile from "@/components/data/filter/medias/FilterBarMobile";
import FilterBarLaptop from "@/components/data/filter/medias/FilterBarLaptop";
import FilterBarFallback from "@/components/data/filter/medias/FilterBarFallback";
import { FilterBarContainer as Container } from "@/components/data/filter/styles";
import { filterDictionary } from "@/components/data/filter/types";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout/ResponsiveLayout";
import { useGlobal } from "@/contexts/globalContext";
import API from "@/utils/API";
import FavoriteIcon from "@/components/data/filter/FavoriteIcon";

export default function FilterBar({ header }: { header: string[] }) {
  const { filters, handleSelectedFilter } = useGlobal();

  const [data, setData] = useState<{ id: string; name: string }[]>([]);

  const handleRequest = async () => {
    try {
      if (!filters) return setData([]);

      const endpoint = filterDictionary[filters] || filters;
      const response = await API.GET(`${endpoint}`);
      if (response && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (filters !== "statusBy") void handleRequest();
    if (filters === "statusBy")
      setData([
        { id: "playing", name: "Playing" },
        { id: "done", name: "Done" },
        { id: "abandoned", name: "Abandoned" },
      ]);

    handleSelectedFilter({
      target: { value: "" },
    } as React.ChangeEvent<HTMLSelectElement>);
  }, [filters]);

  return (
    <Container>
      <ResponsiveLayout
        mobile={<FilterBarMobile header={header} data={data} favoriteIcon={<FavoriteIcon />} />}
        laptop={<FilterBarLaptop header={header} data={data} favoriteIcon={<FavoriteIcon />} />}
        fallback={<FilterBarFallback data={data} favoriteIcon={<FavoriteIcon />} />}
      />
    </Container>
  );
}
