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
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div<{ size: string }>`
  width: 100%;
  max-width: ${({ size }) => SIZES[size as keyof typeof SIZES] || SIZES.md};
  max-height: 90vh;
  border-radius: 8px;

  overflow-y: auto;
  background-color: var(--color-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  size = "md",
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
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay role="dialog" aria-modal="true">
      <ModalContainer ref={modalRef} size={size} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>,
    document.body,
  );
}
