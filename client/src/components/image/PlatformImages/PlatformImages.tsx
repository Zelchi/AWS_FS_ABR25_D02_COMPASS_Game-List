import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";
import { useModal } from "@/contexts/modalContext";
import { useGlobal } from "@/contexts/globalContext";
import MoreIcon from "@/assets/icons/dots.svg?react";
import { useState } from "react";
import { Container, Image, StyledIcon } from "@/components/image/PlatformImages/styles";

export default function PlatformImages({ game }: { game: IGameEntity }) {
  const { isModalOpen } = useModal();
  const { isMobile } = useGlobal();
  const maxNPlatforms = isMobile ? 1 : 3;

  const [validCount, setValidCount] = useState(0);

  const platforms = (game.platforms ?? []) as IPlatformEntity[];
  const platformsWithImage = platforms.filter((p) => p.imageUrl?.trim()).slice(0, maxNPlatforms);

  const handleValidImage = () => {
    setValidCount((prev) => prev + 1);
  };

  if (isModalOpen) {
    return (
      <div>
        <p>
          {platforms.map((platform, index) => (
            <span key={platform.id}>
              {platform.name}
              {index < platforms.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    );
  }

  return (
    <Container>
      {platformsWithImage.map((platform) => (
        <Image key={platform.id} src={platform.imageUrl} onValid={handleValidImage} />
      ))}

      {(platforms.length > maxNPlatforms || validCount === 0) && <StyledIcon icon={MoreIcon} />}
    </Container>
  );
}
