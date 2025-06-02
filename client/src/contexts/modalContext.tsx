import { createContext, useState, ReactNode } from "react";

type ModalContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    modalContent: ReactNode | null;
    setModalContent: (content: ReactNode | null) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                modalContent,
                setModalContent,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}