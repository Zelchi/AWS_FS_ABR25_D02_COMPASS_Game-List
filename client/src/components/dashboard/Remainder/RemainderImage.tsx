import {
  GameTitle,
  Image,
  ImageContainer as Container,
} from "@/components/dashboard/Remainder/styles";
import defaultImage from "@/assets/imgs/default-image.jpg";
import { useGlobal } from "@/contexts/globalContext";

export default function RemainderImage({
  gameImage,
  gameTitle,
}: {
  gameImage: string;
  gameTitle: string;
}) {
  const { isLaptop } = useGlobal();

  return (
    <Container>
      <Image src={gameImage || defaultImage} fallback={defaultImage} />
      {!isLaptop && (
        <GameTitle>
          <span>{gameTitle}</span>
        </GameTitle>
      )}
    </Container>
  );
}
