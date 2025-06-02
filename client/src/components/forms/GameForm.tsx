import { useEffect, useState } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import { useAddItem } from "@/contexts/AddItemContext";
import Modal from "../global/Modal";

export default function GameForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: IGameEntity) => void;
  initialData?: IGameEntity;
}) {
  const [game, setGame] = useState<Partial<IGameEntity>>({ title: "", category: "" });
  const { isModalOpen, closeModal } = useAddItem();

  return (
    <Modal isOpen={isModalOpen} onClose={() => closeModal()} title="New Game" size="md">
      <form>
        <input
          placeholder="Título"
          onChange={(e) => setGame((g) => ({ ...g, title: e.target.value }))}
        />
        <button type="submit">Salvar</button>
      </form>

      <div>
        <button onClick={() => closeModal()}>Fechar</button>
      </div>
    </Modal>
  );
}
