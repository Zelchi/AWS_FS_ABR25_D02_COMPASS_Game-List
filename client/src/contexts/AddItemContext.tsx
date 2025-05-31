import { createContext, useContext, useState, ReactNode } from "react";

type AddItemHandler = () => void;
type AddItemFormComponent = ReactNode;

const AddItemContext = createContext({
  setAddItemHandler: (handler: AddItemHandler | null) => {},
  triggerAddItem: () => {},
  setFormComponent: (component: AddItemFormComponent | null) => {},
  formComponent: null as AddItemFormComponent | null,
});

export const AddItemProvider = ({ children }: { children: ReactNode }) => {
  const [handler, setHandler] = useState<AddItemHandler | null>(null);
  const [formComponent, setFormComponent] = useState<AddItemFormComponent | null>(null);

  const triggerAddItem = () => {
    if (handler) handler();
  };

  return (
    <AddItemContext.Provider
      value={{ setAddItemHandler: setHandler, setFormComponent, triggerAddItem, formComponent }}
    >
      {children}
    </AddItemContext.Provider>
  );
};

export const useAddItem = () => useContext(AddItemContext);
