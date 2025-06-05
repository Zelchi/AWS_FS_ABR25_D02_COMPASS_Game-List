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
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
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
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 3rem;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: keyof typeof SIZES;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnEsc = true,
  closeOnClickOutside = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const el = modalRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      el?.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <Overlay role="dialog" aria-modal="true" onMouseDown={handleOverlayClick}>
      <ModalContainer ref={modalRef} size={size} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>,
    document.body,
  );
}
