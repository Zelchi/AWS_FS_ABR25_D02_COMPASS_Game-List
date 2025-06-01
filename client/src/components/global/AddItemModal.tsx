import { useAddItem } from "@/contexts/AddItemContext";
import Modal from "@/components/global/Modal";

export default function AddItemModal() {
  const { formComponent, isModalOpen, closeModal } = useAddItem();

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {formComponent}
    </Modal>
  );
}
