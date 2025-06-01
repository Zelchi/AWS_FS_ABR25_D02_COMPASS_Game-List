import { createContext, useContext, useState, ReactNode } from "react";

type AddItemHandler = () => void;
type AddItemFormComponent = ReactNode;

type AddItemContextType = {
  setAddItemHandler: (handler: AddItemHandler | null) => void;
  triggerAddItem: () => void;
  setFormComponent: (component: AddItemFormComponent | null) => void;
  formComponent: AddItemFormComponent | null;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AddItemContext = createContext<AddItemContextType>({
  setAddItemHandler: () => {},
  triggerAddItem: () => {},
  setFormComponent: () => {},
  formComponent: null,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const AddItemProvider = ({ children }: { children: ReactNode }) => {
  const [handler, setHandler] = useState<AddItemHandler | null>(null);
  const [formComponent, setFormComponent] = useState<AddItemFormComponent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerAddItem = () => {
    if (handler) handler();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormComponent(null); // limpando form ao fechar o modal, se quiser
  };

  return (
    <AddItemContext.Provider
      value={{
        setAddItemHandler: setHandler,
        triggerAddItem,
        setFormComponent,
        formComponent,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AddItemContext.Provider>
  );
};

export const useAddItem = () => useContext(AddItemContext);
