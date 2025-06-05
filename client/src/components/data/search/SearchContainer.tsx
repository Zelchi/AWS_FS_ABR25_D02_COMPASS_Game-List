import React from "react";
import ClearButton from "@/components/data/clear/ClearButton";
import SearchBar from "@/components/data/search/SearchBar";
import { Container } from "@/components/data/search/styles";
import { useGlobal } from "@/contexts/globalContext";

export default function SearchContainer({ onLoadItems }: { onLoadItems: () => Promise<void> }) {
  const { isMobile } = useGlobal();

  return (
    <Container>
      <SearchBar onLoadItems={onLoadItems} />
      {!isMobile && <ClearButton onLoadItems={onLoadItems} />}
    </Container>
  );
}
