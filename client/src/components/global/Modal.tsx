import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const SIZES = {
    sm: "400px",
    md: "600px",
    lg: "800px",
    xl: "1000px",
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: var(--transition);
`;

const ModalContainer = styled.div<{ size: string }>`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 16px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: ${({ size }) => SIZES[size as keyof typeof SIZES] || SIZES.md};
  transform: translateY(0);
  transition: var(--transition);
`;

const ModalHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: yellowgreen;
`;

const ModalTitle = styled.h1`
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: 0%;
`;

const CloseButton = styled.button`
  font-size: 24px; 
`;

const ModalContent = styled.div`
  width: 100%;
  background-color: purple;
`;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    size?: "sm" | "md" | "lg" | "xl";
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    children,
    title,
    size = "md",
    closeOnClickOutside = true,
    closeOnEsc = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, closeOnEsc]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";

            if (modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnClickOutside && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const Portal = createPortal(
        <Overlay onClick={handleOverlayClick} role="dialog" aria-modal="true">
            <ModalContainer ref={modalRef} size={size} onClick={e => e.stopPropagation()}>
                {title && (
                    <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                        <CloseButton onClick={onClose} aria-label="Close">
                            X
                        </CloseButton>
                    </ModalHeader>
                )}
                <ModalContent>

                    {children}

                </ModalContent>
            </ModalContainer>
        </Overlay>,
        document.body
    );

    return Portal;
}