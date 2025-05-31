import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAddItem } from "@/contexts/AddItemContext";
import ToggleButton from "@/components/navigation/ToggleButton";
import Button from "@/components/global/Button";

export const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/games",
    label: "Games",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/platforms",
    label: "Platforms",
  },
  {
    path: "/login",
    label: "Logout",
  },
];
const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 2.2rem;
  color: var(--color-white);
`;

const Separator = styled.hr`
  color: var(--color-grey-light-01);
  margin: 3rem 0;
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
`;

export default function SiteHeader({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  const { triggerAddItem } = useAddItem();
  const path = useLocation().pathname;

  return (
    <>
      <Header>
        <ToggleButton isOpen={isOpen} onOpen={onOpen} />
        {path !== "/" && (
          <>
            <Title>{routes.find((route) => route.path === path)?.label}</Title>
            <ButtonWrapper>
              <Button size="medium" onClick={triggerAddItem}>
                Add new{" "}
                {path === "/games" ? "game" : path === "/categories" ? "category" : "platform"}
              </Button>
            </ButtonWrapper>
          </>
        )}
      </Header>
      {path !== "/" && <Separator />}
    </>
  );
}
