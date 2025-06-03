import { useState } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";

export default function GameForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: IGameEntity) => void;
  initialData?: IGameEntity;
}) {
  const [game, setGame] = useState<Partial<IGameEntity>>({ ...initialData });

  return (
    <form>
      <input
        placeholder="Título"
        onChange={(e) => setGame((g) => ({ ...g, title: e.target.value }))}
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
