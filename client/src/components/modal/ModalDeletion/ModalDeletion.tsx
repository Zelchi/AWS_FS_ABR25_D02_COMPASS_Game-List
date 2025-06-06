import { useState } from "react";
import { useModal } from "@/contexts/modalContext";
import { useGlobal } from "@/contexts/globalContext";
import API from "@/utils/API";
import styled from "styled-components";

const Container = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  margin-bottom: 1rem;
`;

const ItemName = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--color-primary);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #b71c1c;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #e57373;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    cursor: not-allowed;
    color: #bdbdbd;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  margin-top: 1rem;
`;

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
      <Header>Confirm Deletion</Header>
      <Message>Are you sure you want to delete this item?</Message>
      <ItemName>{initialData.name}</ItemName>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonGroup>
        <CancelButton type="button" onClick={handleCancel} disabled={deleting}>
          Cancel
        </CancelButton>
        <DeleteButton type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting..." : "Delete"}
        </DeleteButton>
      </ButtonGroup>
    </Container>
  );
};

export default ModalDeletion;
