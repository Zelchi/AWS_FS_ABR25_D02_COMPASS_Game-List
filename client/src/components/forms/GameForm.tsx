import { useState } from "react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";

export default function GameForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: IGameEntity) => void;
  initialData?: IGameEntity;
}) {
  const [game, setGame] = useState<Partial<IGameEntity>>({ title: "", category: "" });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit({
  //     ...game,
  //     id: Date.now(),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     acquired: new Date(),
  //     finished: new Date(),
  //     status: "Backlog",
  //     favorite: false,
  //     image: "",
  //   } as IGameEntity);
  // };

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
