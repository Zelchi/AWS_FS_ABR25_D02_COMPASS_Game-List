import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";
import GameForm from "@/components/forms/GameForms/GameForm";
import CategoryForm from "@/components/forms/CategoryForm";
import PlatformForm from "@/components/forms/PlatformForm";

type ModalContextType = {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    modalContent: ReactNode | null;
    setModalContent: Dispatch<SetStateAction<ReactNode | null>>;
    handleModalContent: (path: string) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const handleModalContent = (path: string, initialData: any) => {
        setModalContent(() => {
            switch (path) {
                case "/games":
                    return <GameForm initialData={initialData}/>;
                case "/categories":
                    return <CategoryForm initialData={initialData}/>;
                case "/platforms":
                    return <PlatformForm initialData={initialData}/>;
                default:
                    return null;
            }
        });
        setIsModalOpen(true);
    };

    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                modalContent,
                setModalContent,
                handleModalContent
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
