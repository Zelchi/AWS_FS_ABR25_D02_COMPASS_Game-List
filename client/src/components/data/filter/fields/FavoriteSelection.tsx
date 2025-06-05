import { FavoriteContainer as Container } from "@/components/data/filter/styles";
import React from "react";

export default function FavoriteSelection({ favoriteIcon }: { favoriteIcon: React.JSX.Element }) {
  return (
    <Container>
      <span>Filter by favorite</span>
      {favoriteIcon}
    </Container>
  );
}
