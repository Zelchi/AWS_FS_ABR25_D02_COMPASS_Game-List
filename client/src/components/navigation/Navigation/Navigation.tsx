import styled from "styled-components";
import HouseIcon from "../../assets/icons/house-outline.svg?react";
import ControllerIcon from "../../assets/icons/controller.svg?react";
import TagIcon from "../../assets/icons/tag.svg?react";
import ChipIcon from "../../assets/icons/chip.svg?react";
import SignOutIcon from "../../assets/icons/sign-out-outline.svg?react";
import React from "react";
import { NavItem } from "@/components/navigation/NavItem";

const routes = [
  {
    path: "/",
    label: "Home",
    icon: <HouseIcon />,
  },
  {
    path: "/Games",
    label: "Games",
    icon: <ControllerIcon />,
  },
  {
    path: "/Categories",
    label: "Categories",
    icon: <TagIcon />,
  },
  {
    path: "/Platforms",
    label: "Platforms",
    icon: <ChipIcon />,
  },
  {
    path: "/Login",
    label: "Logout",
    icon: <SignOutIcon />,
  },
];

const Nav = styled.nav<{ $isOpen: boolean }>`
  width: 71.85%;
  height: 100%;
  overflow: hidden;
  transition:
    height 0.5s ease-in-out,
    opacity 0.5s ease-in-out;

  @media (max-width: 48em) {
    margin-bottom: 1.5rem;
    padding: 0 3rem;
    width: 100%;
  }

  @media (max-width: 30em) {
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    margin-bottom: 0;
    height: ${({ $isOpen }) => ($isOpen ? "calc(100vh - 7.825rem)" : "0")};
  }
`;

const NavList = styled.ul`
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  transition: var(--transition);

  @media (max-width: 48em) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }

  @media (max-width: 30em) {
    flex-direction: column;
    gap: 2rem;
    margin: auto 0;
  }
`;

export default function Navigation({ isOpen }: { isOpen: boolean }) {
  return (
    <Nav $isOpen={isOpen}>
      <NavList>
        {routes.map((route) => (
          <NavItem key={route.label} {...route} />
        ))}
      </NavList>
    </Nav>
  );
}
