import { ButtonSet as StyledButtonSet } from "@/components/dashboard/Remainder/styles";
import Button from "@/components/button/Button";

type ButtonSetProps = {
  onPlaying: () => Promise<void>;
  onAbandoned: () => Promise<void>;
  onIsRating: () => void;
};

export default function ButtonSet({ onPlaying, onAbandoned, onIsRating }: ButtonSetProps) {
  return (
    <StyledButtonSet>
      <Button size="large" upper onClick={onPlaying}>
        Yes
      </Button>
      <Button size="large" upper onClick={onIsRating}>
        No, it's finished
      </Button>
      <Button size="large" variant="danger" upper onClick={onAbandoned}>
        I quit
      </Button>
    </StyledButtonSet>
  );
}
