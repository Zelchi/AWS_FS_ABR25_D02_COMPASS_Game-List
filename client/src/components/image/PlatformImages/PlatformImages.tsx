import { IGameEntity } from "../../../../server/src/Game/GameEntity";
import { IPlatformEntity } from "../../../../server/src/Platform/PlatformEntity";
import styled from "styled-components";
import { useModal } from "@/contexts/modalContext";
import { useGlobal } from "@/contexts/globalContext";
import Icon from "@/components/image/Icon/Icon";
import SmartImage from "./SmartImage";
import { useState } from "react";

const Container = styled.span`
  max-width: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Image = styled(SmartImage)`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
`;

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

      {(platforms.length > maxNPlatforms || validCount === 0) && <Icon />}
    </Container>
  );
}
