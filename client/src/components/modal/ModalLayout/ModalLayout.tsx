import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalContainer, ModalContent } from "@/components/modal/ModalLayout/styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
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
      <ModalContainer ref={modalRef} onClick={(e: React.ChangeEvent<any>) => e.stopPropagation()}>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>,
    document.body,
  );
}
