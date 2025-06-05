import StarIcon from "@/assets/icons/star.svg?react";
import { StyledIcon } from "./styles";

type StarProps = {
  full: boolean;
  onRate?: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  size?: number;
};

export default function Star({ full, onRate, onHoverIn, onHoverOut, size }: StarProps) {
  return (
    <StyledIcon
      icon={StarIcon}
      role="button"
      onClick={onRate}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      $full={full}
      $size={size}
    />
  );
}
