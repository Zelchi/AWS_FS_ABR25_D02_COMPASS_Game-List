import { useState } from "react";
import DangerIcon from "@/assets/icons/danger.svg?react";
import { InvalidMessage } from "@/components/forms/LoginForm/styles";
import Button from "@/components/button/Button";
import {
  Header,
  Message,
  ItemName,
  ButtonSet,
  StyledIcon,
  Container,
} from "@/components/modal/ModalDeletion/styles";
import { useModal } from "@/contexts/modalContext";
import { useGlobal } from "@/contexts/globalContext";
import API from "@/utils/API";
import { routes } from "@/routes/routes";

interface DeletionConfirmModalProps {
  path: string;
  initialData: any;
}

const ModalDeletion = ({ path, initialData }: DeletionConfirmModalProps) => {
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { setIsModalOpen, setModalContent } = useModal();
  const { handleClear } = useGlobal();

  const getEndpoint = () => {
    switch (path) {
      case "/games":
        return `/game/${initialData.id}`;
      case "/categories":
        return `/category/${initialData.id}`;
      case "/platforms":
        return `/platform/${initialData.id}`;
      default:
        return null;
    }
  };

  const handleDelete = async () => {
    setError("");
    setDeleting(true);

    const endpoint = getEndpoint();
    if (!endpoint) {
      setError("Invalid item type");
      setDeleting(false);
      return;
    }

    try {
      const response = await API.DELETE(endpoint);

      if (response && response.status === 204) {
        setIsModalOpen(false);
        setModalContent(null);
        handleClear();
      }
    } catch (e) {
      setError("An error occurred while deleting the item. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <Container>
      <div>
        <StyledIcon icon={DangerIcon} />
        <Header>Are you sure?</Header>
        <Message>
          {path === "/games" && <span>You're about to delete {initialData.name}</span>}
          Deleting this {routes.find((route) => route.path === path)?.singular} will remove it
          permanently from system. This action is not reversible.
        </Message>

        {error && <InvalidMessage>{error}</InvalidMessage>}

        <ButtonSet>
          <Button
            type="button"
            variant="secondary"
            size="large"
            upper
            onClick={handleCancel}
            disabled={deleting}
          >
            On second thought...
          </Button>
          <Button
            type="button"
            variant="danger"
            size="large"
            upper
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Yes, for sure!"}
          </Button>
        </ButtonSet>
      </div>
    </Container>
  );
};

export default ModalDeletion;
