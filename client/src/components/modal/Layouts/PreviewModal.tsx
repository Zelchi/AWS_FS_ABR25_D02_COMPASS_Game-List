import styled from "styled-components";
import { useModal } from "@/contexts/modalContext";
import defaultImage from "@/assets/imgs/default-image.jpg";
import SmartImage from "@/components/logic/SmartImage";

const Container = styled.div`
  padding: 2rem;
  min-width: 320px;
  max-width: 480px;
  background: #fff;
  border-radius: 8px;
`;

const Header = styled.h2`
  margin-bottom: 1rem;
`;

const Field = styled.div`
  margin-bottom: 0.75rem;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const Image = styled.span`
  display: block;
  width: 100%;
  max-width: 100%;
  height: 180px;
  border-radius: 6px;
  margin-bottom: 1rem;
  background-color: #eee;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.5rem 1.5rem;
  border: none;
  background: #1976d2;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

function renderGame(game: any) {
    return (
        <>
            <SmartImage
                src={game.imageUrl}
                fallback={defaultImage}
                className={Image.styledComponentId}
            />
            <Field>
                <Label>Name:</Label> {game.name}
            </Field>
            <Field>
                <Label>Description:</Label> {game.description}
            </Field>
            <Field>
                <Label>Status:</Label> {game.status}
            </Field>
            <Field>
                <Label>Favorite:</Label> {game.favorite ? "Yes" : "No"}
            </Field>
            <Field>
                <Label>Rating:</Label> {game.rating}
            </Field>
            <Field>
                <Label>Price:</Label> R$ {(game.price / 100).toFixed(2)}
            </Field>
            <Field>
                <Label>Acquisition Date:</Label> {game.acquisDate && new Date(game.acquisDate).toLocaleDateString()}
            </Field>
            <Field>
                <Label>Completion Date:</Label> {game.finishDate && new Date(game.finishDate).toLocaleDateString()}
            </Field>
            <Field>
                <Label>Categories:</Label> {game.categories?.map((c: any) => c.name).join(", ")}
            </Field>
            <Field>
                <Label>Platforms:</Label> {game.platforms?.map((p: any) => p.name).join(", ")}
            </Field>
        </>
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
            <Header>{title}</Header>
            {content}
            <Button onClick={handleClose}>Close</Button>
        </Container>
    );
}