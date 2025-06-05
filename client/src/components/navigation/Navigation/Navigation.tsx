import React from "react";
import { NavItem } from "@/components/navigation/NavItem/NavItem";
import { routes } from "@/routes/routes";
import { Nav, NavList } from "@/components/navigation/Navigation/styles";

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
