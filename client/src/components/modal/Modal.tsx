import { useModal } from "@/contexts/modalContext";
import ModalLayout from "./ModalLayout";

const Modal = () => {
  const { isModalOpen, setIsModalOpen, modalContent } = useModal();

  return (
    <ModalLayout
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      closeOnClickOutside={true}
      closeOnEsc={true}
    >
      {modalContent}
    </ModalLayout>
  );
};

export default Modal;
