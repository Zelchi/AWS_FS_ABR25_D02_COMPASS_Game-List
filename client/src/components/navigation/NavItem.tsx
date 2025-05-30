import styled from "styled-components";
import { useLocation } from "react-router-dom";
import React from "react";

const NavItemEl = styled.li<{ $active: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:last-child {
    margin-top: auto;
    margin-bottom: 3.2rem;

    @media (max-width: 48em) {
      margin: auto;
      width: fit-content;
    }

    @media (max-width: 30em) {
      margin: 0;
      margin-top: 30%;
      width: 100%;
    }
  }
`;

const NavLink = styled.a<{ $filled: boolean; $active: boolean }>`
  width: 100%;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border-radius: 0.4rem;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1;
  font-family: var(--font-primary);
  text-decoration: none;
  transition: var(--transition);
  
  span {
    display: inline-block;
    stroke: ${({ $filled, $active }) =>
      $filled ? "none" : $active ? "var(--color-black)" : "var(--color-white)"};
    fill: ${({ $filled, $active }) =>
      !$filled ? "none" : $active ? "var(--color-black)" : "var(--color-white)"};
    width: 1.8rem;
    transition: var(--transition);

    @media (max-width: 48em) {
      display: none;
      font-size: 1.2rem;
    } 
      
    @media (max-width: 30em) {
        
      display: block;
        font-size: 1.4rem;
    }
  }

  &:visited,
  &:link {
    background-color: ${({ $active }) => ($active ? "var(--color-aqua)" : "transparent")};
    color: ${({ $active }) => ($active ? "var(--color-black)" : "var(--color-white)")};
  }

  &:hover,
  &:focus {
    background-color: ${({ $active }) => ($active ? "var(--color-aqua-light)" : "transparent")};
    color: ${({ $active }) => ($active ? "var(--color-black)" : "var(--color-aqua)")};

    span {
      stroke: ${({ $filled, $active }) =>
        $filled ? "none" : $active ? "var(--color-black)" : "var(--color-aqua)"};
      fill: ${({ $filled, $active }) =>
        !$filled ? "none" : $active ? "var(--color-black)" : "var(--color-aqua)"};
    }
  }

  @media (max-width: 48em) {  
    width: fit-content;
    padding: .8rem;
  }

    @media (max-width: 30em) {  
      padding: 1.2rem;
    }
}
`;

type NavItemProps = {
  path: string;
  label: string;
  icon: React.JSX.Element;
};

export function NavItem({ path, label, icon }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <NavItemEl $active={isActive}>
      <NavLink href={path} $active={isActive} $filled={label === "Home" || label === "Logout"}>
        {label === "Logout" ? (
          <>
            {label}
            <span>{icon}</span>
          </>
        ) : (
          <>
            <span>{icon}</span>
            {label}
          </>
        )}
      </NavLink>
    </NavItemEl>
  );
}
