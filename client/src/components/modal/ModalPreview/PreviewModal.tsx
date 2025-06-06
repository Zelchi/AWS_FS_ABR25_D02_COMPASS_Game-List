import { useModal } from "@/contexts/modalContext";
import defaultImage from "@/assets/imgs/default-image.jpg";
import HeartIcon from "@/assets/icons/heart.svg?react";
import {
  Container,
  Field,
  Label,
  Banner,
  GameInfo,
  GameTitle,
  GameImage,
  GameDescription,
  GameSummary,
  StyledIcon,
  GameStatus,
  Multiplatform,
  GameRating,
  Info,
  Categories,
  StyledPlatformImages,
} from "@/components/modal/ModalPreview/styles";
import React from "react";
import SmartImage from "@/components/logic/SmartImage";
import Button from "@/components/button/Button";

const ratingLabels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

function renderGame(game: any) {
  return (
    <div>
      <GameImage>
        <Banner src={game.imageUrl || defaultImage} fallback={defaultImage} />
        <GameTitle>
          <span>{game.name}</span>
        </GameTitle>
        <StyledIcon icon={HeartIcon} role="button" $isFavorite={game.favorite || false} />
      </GameImage>
      <GameInfo>
        <GameSummary>
          <GameStatus $status={game.status}>{game.status}</GameStatus>
          {game.platforms.length > 1 && <Multiplatform>Multiplatform</Multiplatform>}
          <GameRating $rating={game.rating}>{ratingLabels[game.rating]}</GameRating>
        </GameSummary>
        <Info>
          <GameDescription>{game.description}</GameDescription>
          <Field>
            <Label>Price:</Label> R$ {(game.price / 100).toFixed(2)}
          </Field>
          <Field>
            <Label>Acquisition Date:</Label>{" "}
            {game.acquisDate && new Date(game.acquisDate).toLocaleDateString()}
          </Field>
          {game.status === "done" && (
            <Field>
              <Label>Completion Date:</Label>{" "}
              {game.finishDate && new Date(game.finishDate).toLocaleDateString()}
            </Field>
          )}
        </Info>
        <Info>
          <Categories>{game.categories?.map((c: any) => c.name).join(", ")}</Categories>

          {game.platforms?.length > 1 && <StyledPlatformImages game={game} />}
          <Field>
            <Label>Platforms:</Label> {game.platforms?.map((p: any) => p.name).join(", ")}
          </Field>
        </Info>
      </GameInfo>
    </div>
  );
}

function renderCategory(category: any) {
  return (
    <>
      <Field>
        <Label>Name:</Label> {category.name}
      </Field>
      {category.games && (
        <Field>
          <Label>Games:</Label> {category.games.map((g: any) => g.name).join(", ")}
        </Field>
      )}
    </>
  );
}

function renderPlatform(platform: any) {
  return (
    <>
      <SmartImage
        src={platform.imageUrl}
        fallback={defaultImage}
        className={Image.styledComponentId}
      />
      <Field>
        <Label>Name:</Label> {platform.name}
      </Field>
      <Field>
        <Label>Company:</Label> {platform.company}
      </Field>
      {platform.games && (
        <Field>
          <Label>Games:</Label> {platform.games.map((g: any) => g.name).join(", ")}
        </Field>
      )}
    </>
  );
}

interface PreviewModalProps {
  path: string;
  initialData: any;
}

export default function PreviewModal({ path, initialData }: PreviewModalProps) {
  const { setIsModalOpen, setModalContent } = useModal();

  if (!initialData) return null;

  let content = null;
  let title = "Preview";

  switch (path) {
    case "/games":
      content = renderGame(initialData);
      title = `Preview Game: ${initialData.name}`;
      break;
    case "/categories":
      content = renderCategory(initialData);
      title = `Preview Category: ${initialData.name}`;
      break;
    case "/platforms":
      content = renderPlatform(initialData);
      title = `Preview Platform: ${initialData.name}`;
      break;
    default:
      return null;
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <Container>
      {content}
      <Button variant="secondary" size="large" upper onClick={handleClose}>
        Close
      </Button>
    </Container>
  );
}
