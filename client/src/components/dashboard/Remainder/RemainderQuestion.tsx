import {
  GameTitleTag,
  Question as StyledQuestion,
  QuestionContainer as Container,
  QuestionWrapper as Wrapper,
} from "@/components/dashboard/Remainder/styles";
import { AnimatePresence, motion } from "framer-motion";
import ButtonSet from "./ButtonSet";
import StarRating from "@/components/rating/Rating/StarRating";
import { useGlobal } from "@/contexts/globalContext";
import { fadeInDown } from "@/styles/animations";

type QuestionProps = {
  gameTitle: string;
  isRating: boolean;
  onPlaying: () => Promise<void>;
  onAbandoned: () => Promise<void>;
  onIsRating: () => void;
  onRate: (rating: number) => Promise<void>;
};

export default function RemainderQuestion({
  gameTitle,
  isRating,
  onPlaying,
  onAbandoned,
  onIsRating,
  onRate,
}: QuestionProps) {
  const { isLaptop } = useGlobal();

  return (
    <Container>
      <Wrapper>
        {isLaptop && <GameTitleTag>{gameTitle}</GameTitleTag>}
        <StyledQuestion>Are you still playing?</StyledQuestion>
        <AnimatePresence mode="wait">
          {isRating ? (
            <motion.div key="rating" {...fadeInDown}>
              <StarRating onSetRating={onRate} size={36} />
            </motion.div>
          ) : (
            <motion.div key="buttons" {...fadeInDown}>
              <ButtonSet onPlaying={onPlaying} onIsRating={onIsRating} onAbandoned={onAbandoned} />
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
}
