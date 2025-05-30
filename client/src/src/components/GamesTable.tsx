import React from 'react';
import styled from 'styled-components';
import StarIcon from '../assets/icons/Star.png';
import StarIcon2 from '../assets/icons/Star2.png';
import EyeIcon from '../assets/icons/Eye.png';
import EditIcon from '../assets/icons/Pen.png';
import DeleteIcon from '../assets/icons/Trash.png';

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
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  min-width: 0;
  font-size: 0.95rem;
  color: #181A20;
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

const GamesTable: React.FC<GamesTableProps> = ({ games, onGameUpdate }) => {
  const handleFavoriteClick = (game: Game) => {
    onGameUpdate({
      ...game,
      favorite: !game.favorite
    });
  };

  const handleViewClick = (game: Game) => {
    // Implement view functionality
    console.log('View game:', game);
  };

  const handleEditClick = (game: Game) => {
    // Implement edit functionality
    console.log('Edit game:', game);
  };

  const handleDeleteClick = (game: Game) => {
    // Implement delete functionality
    console.log('Delete game:', game);
  };

  return (
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
              <IconImg src={game.id === 2 ? StarIcon2 : StarIcon} alt="Favorite" style={{ filter: game.favorite ? 'none' : 'grayscale(1)' }} />
            </IconButton>
          </Cell>
          <Cell flex={1} center>
            <IconButton onClick={() => handleViewClick(game)}>
              <IconImg src={EyeIcon} alt="View" />
            </IconButton>
          </Cell>
          <Cell flex={1} center>
            <IconButton onClick={() => handleEditClick(game)}>
              <IconImg src={EditIcon} alt="Edit" />
            </IconButton>
          </Cell>
          <Cell flex={1} center>
            <IconButton onClick={() => handleDeleteClick(game)}>
              <IconImg src={DeleteIcon} alt="Delete" />
            </IconButton>
          </Cell>
        </Row>
      ))}
    </TableWrapper>
  );
};

export default GamesTable; 