import { useState } from "react";
import Modal from "../components/global/Modal";

export default function NotFound() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Abrir Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New Game" size="md">
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>

        <div>
          <button onClick={() => setIsOpen(false)}>Fechar</button>
        </div>
      </Modal>
    </>
  );
}
