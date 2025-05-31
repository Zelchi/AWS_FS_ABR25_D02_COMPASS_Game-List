import { useEffect } from "react";
import { useAddItem } from "@/contexts/AddItemContext";
import Modal from "@/components/global/Modal";

export default function AddItemModal() {
  const { formComponent, setFormComponent } = useAddItem();

  const handleClose = () => {
    setFormComponent(null);
  };

  return (
    <Modal isOpen={!!formComponent} onClose={handleClose}>
      {formComponent}
    </Modal>
  );
}
