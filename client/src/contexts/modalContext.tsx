import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";
import GameForm from "@/components/forms/GameForm/GameForm";
import CategoryForm from "@/components/forms/CategoryForm/CategoryForm";
import PlatformForm from "@/components/forms/PlatformForm/PlatformForm";
import ModalDeletion from "@/components/modal/ModalDeletion/ModalDeletion";
import PreviewModal from "@/components/modal/ModalPreview/PreviewModal";

type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode | null>>;
  handleModalContent: (path: string, initialData: any) => void;
  handleModalDeleteConfirm: (path: string, initialData: any) => void;
  HandlePreviewModal: (path: string, initialData: any) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>();

  const handleModalContent = (path: string, initialData: any) => {
    setModalContent(() => {
      switch (path) {
        case "/games":
          return <GameForm initialData={initialData} />;
        case "/categories":
          return <CategoryForm initialData={initialData} />;
        case "/platforms":
          return <PlatformForm initialData={initialData} />;
        default:
          return null;
      }
    });
    setIsModalOpen(true);
  };

  const handleModalDeleteConfirm = (path: string, initialData: any) => {
    setModalContent(() => <ModalDeletion path={path} initialData={initialData} />);
    setIsModalOpen(true);
  };

  const HandlePreviewModal = (path: string, initialData: any) => {
    setModalContent(() => <PreviewModal path={path} initialData={initialData} />);
    setIsModalOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        modalContent,
        setModalContent,
        handleModalContent,
        handleModalDeleteConfirm,
        HandlePreviewModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used inside a ModalProvider");
  }
  return context;
};
