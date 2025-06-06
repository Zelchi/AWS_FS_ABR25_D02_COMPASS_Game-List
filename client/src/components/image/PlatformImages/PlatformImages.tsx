import { IGameEntity } from "@/../../server/src/routes/Game/GameEntity";
import { IPlatformEntity } from "@/../../server/src/routes/Platform/PlatformEntity";
import { useGlobal } from "@/contexts/globalContext";
import MoreIcon from "@/assets/icons/dots.svg?react";
import { useState } from "react";
import { Container, Image, StyledIcon } from "@/components/image/PlatformImages/styles";
import { useModal } from "@/contexts/modalContext";

export default function PlatformImages({
  game,
  className,
}: {
  game: IGameEntity;
  className?: string;
}) {
  const { isModalOpen } = useModal();
  const { isMobile } = useGlobal();
  const maxNPlatforms = isMobile ? 1 : 3;

  const [validCount, setValidCount] = useState(0);

  const platforms = (game.platforms ?? []) as IPlatformEntity[];
  const platformsWithImage = isModalOpen
    ? platforms.filter((p) => p.imageUrl?.trim())
    : platforms.filter((p) => p.imageUrl?.trim()).slice(0, maxNPlatforms);

  const handleValidImage = () => {
    setValidCount((prev) => prev + 1);
  };

  return (
    <Container className={className}>
      {platformsWithImage.map((platform) => (
        <Image key={platform.id} src={platform.imageUrl} onValid={handleValidImage} />
      ))}

      {(platforms.length > maxNPlatforms || validCount === 0) && !isModalOpen && (
        <StyledIcon icon={MoreIcon} />
      )}
    </Container>
  );
}
