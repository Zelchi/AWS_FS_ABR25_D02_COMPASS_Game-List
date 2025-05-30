import React from "react";
import styled from "styled-components";
import Star from "../../assets/star.svg?react";
import StarOutline from "../../assets/star-outline.svg?react";
import EyeOutline from "../../assets/eye-outline.svg?react";
import PenOutline from "../../assets/pen-outline.svg?react";
import TrashOutline from "../../assets/trash-outline.svg?react";
import TableHeader from "@/components/global/TableHeader";

const TableWrapper = styled.div`
  width: 100%;
  background: rgba(24, 24, 27, 1);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(66, 217, 200, 0.1);
  padding: 8px;
  margin-top: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(66, 217, 200, 0.08);
  padding: 8px 16px;
  min-height: 60px;
`;

const Cell = styled.div<{ flex?: number; center?: boolean }>`
  flex: ${({ flex }) => flex || 1};
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  min-width: 0;
  font-size: 0.95rem;
  color: #181a20;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GameImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 4px;
  display: flex;
  align-items: center;
  padding: 4px;
  transition: background 0.2s;
  border-radius: 4px;
  &:hover {
    background: #e0f7fa;
  }
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
`;

export type Game = {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  date: string;
  updatedAt: string;
  favorite: boolean;
};

interface GamesTableProps {
  games: Game[];
  onGameUpdate: (game: Game) => void;
}

export default function Table({ games, onGameUpdate }: GamesTableProps) {
  const handleFavoriteClick = (game: Game) => {
    onGameUpdate({
      ...game,
      favorite: !game.favorite,
    });
  };

  const handleViewClick = (game: Game) => {
    // Implement view functionality
    console.log("View game:", game);
  };

  const handleEditClick = (game: Game) => {
    // Implement edit functionality
    console.log("Edit game:", game);
  };

  const handleDeleteClick = (game: Game) => {
    // Implement delete functionality
    console.log("Delete game:", game);
  };

  return (
    <>
      <TableHeader />
      <TableWrapper>
        {games.map((game) => (
          <Row key={game.id}>
            <Cell flex={1}>
              <GameImg src={game.image} alt={game.title} />
            </Cell>
            <Cell flex={2}>{game.title}</Cell>
            <Cell flex={3}>{game.description}</Cell>
            <Cell flex={1}>{game.category}</Cell>
            <Cell flex={2}>{game.date}</Cell>
            <Cell flex={2}>{game.updatedAt}</Cell>
            <Cell flex={1} center>
              <IconButton onClick={() => handleFavoriteClick(game)}>
                {game.id === 2 ? <StarOutline /> : <Star />}
              </IconButton>
            </Cell>
            <Cell flex={1} center>
              <IconButton onClick={() => handleViewClick(game)}>
                <EyeOutline />
              </IconButton>
            </Cell>
            <Cell flex={1} center>
              <IconButton onClick={() => handleEditClick(game)}>
                <PenOutline />
              </IconButton>
            </Cell>
            <Cell flex={1} center>
              <IconButton onClick={() => handleDeleteClick(game)}>
                <TrashOutline />
              </IconButton>
            </Cell>
          </Row>
        ))}
      </TableWrapper>
    </>
  );
}
