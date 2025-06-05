import { useGlobal } from "@/contexts/globalContext";
import { StyledIcon } from "@/components/data/filter/styles";
import HeartIcon from "@/assets/icons/heart.svg?react";
import React from "react";

export default function FavoriteIcon() {
  const { isFavorite, handleIsFavorite } = useGlobal();

  return (
    <StyledIcon
      icon={HeartIcon}
      onClick={handleIsFavorite}
      role="button"
      $isFavorite={isFavorite}
    />
  );
}
