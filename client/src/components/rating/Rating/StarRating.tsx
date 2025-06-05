import { useState } from "react";
import Star from "@/components/rating/Star/Star";
import { Container, Wrapper, Label } from "@/components/rating/Rating/styles";

type StarRatingProps = {
  className?: string;
  size?: number;
  onSetRating?: (value: number) => void;
};

export default function StarRating({ className, size, onSetRating }: StarRatingProps) {
  const maxRating = 5;
  const [rating, setRating] = useState<number>(0);
  const [tempRating, setTempRating] = useState<number>(0);

  const handleRating = (rating: number) => {
    setRating(rating);
    if (onSetRating) onSetRating(rating);
  };

  return (
    <Container className={className}>
      <Wrapper>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            size={size}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </Wrapper>
      <Label $size={size}>{tempRating || rating || ""}</Label>
    </Container>
  );
}
