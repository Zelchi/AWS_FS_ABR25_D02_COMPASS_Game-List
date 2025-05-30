import Sidebar from './Sidebar';
import GamesHeader from './components/GamesHeader';
import GamesTable from './components/GamesTable';
import type { Game } from './components/GamesTable';
import MarioKartImg from './assets/Mario.png';
import ValorantImg from './assets/Valorant.png';
import Pagination from './components/Pagination';
import React, { useState } from 'react';

const initialGames: Game[] = [
  {
    id: 1,
    image: MarioKartImg,
    title: 'Mario Kart',
    description: 'Mario B que ganhei de aniversário',
    category: 'Racing',
    date: '08/12/2021 10:20',
    updatedAt: '',
    favorite: true,
  },
  {
    id: 2,
    image: ValorantImg,
    title: 'Valorant',
    description: 'Valorant que jogo com amigos',
    category: 'FPS',
    date: '08/12/2021 13:45',
    updatedAt: '08/12/2021 10:33',
    favorite: false,
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState<Game[]>(initialGames);

  const handleGameUpdate = (updatedGame: Game) => {
    setGames(games.map(game => 
      game.id === updatedGame.id ? updatedGame : game
    ));
  };

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{
          flex: 1,
          background: '#111113',
          minHeight: '100vh',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '80px'
        }}>
          <GamesHeader />
          <GamesTable games={games} onGameUpdate={handleGameUpdate} />
          <Pagination currentPage={currentPage} totalPages={68} onPageChange={setCurrentPage} />
        </main>
      </div>
    </>
  )
}

export default App
