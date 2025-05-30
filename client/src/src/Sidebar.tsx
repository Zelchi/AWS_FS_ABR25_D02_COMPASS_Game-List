import React from 'react';
import styled from 'styled-components';
import HomeIcon from './assets/Home.png';
import GameIcon from './assets/Game.png';
import CategoriesIcon from './assets/Categories.png';
import PlataformsIcon from './assets/Plataforms.png';
import SignIcon from './assets/Sign.png';
import LogoIcon from './assets/Logo.svg';

const SidebarContainer = styled.aside`
  width: 220px;
  height: 110vh;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(24, 24, 27, 1);
  padding: 24px 0;
  z-index: 10;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 48px;
  position: relative;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #23242b;
  }
`;

const HomeMenuItem = styled(MenuItem)`
  background: rgba(66, 217, 200, 1);
  color: #fff;
  font-weight: bold;
`;

const LogoutWrapper = styled.div`
  width: 100%;
`;

const Logout = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  &:hover {
    background: #23242b;
  }
`;

const LogoImg = styled.img`
  width: 118px;
  height: 54px;
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Logo>
          <LogoImg src={LogoIcon} alt="Logo" />
        </Logo>
        <Menu>
          <HomeMenuItem><IconImg src={HomeIcon} alt="Home" /> Home</HomeMenuItem>
          <MenuItem><IconImg src={GameIcon} alt="Games" /> Games</MenuItem>
          <MenuItem><IconImg src={CategoriesIcon} alt="Categories" /> Categories</MenuItem>
          <MenuItem><IconImg src={PlataformsIcon} alt="Plataforms" /> Plataforms</MenuItem>
        </Menu>
      </div>
      <LogoutWrapper>
        <Logout>
          Logout
          <IconImg src={SignIcon} alt="Logout" />
        </Logout>
      </LogoutWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
