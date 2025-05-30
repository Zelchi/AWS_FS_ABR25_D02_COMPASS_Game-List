import styled from "styled-components";
import React, { ReactNode } from "react";
import ToggleButton from "@/components/navigation/ToggleButton";
import { useLocation } from "react-router-dom";
import SearchBar from "@/components/global/SearchBar";

const routes = [
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

const Main = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-dark-02);

  @media (max-width: 30em) {
    padding-top: 7.58rem;
  }
`;

const Title = styled.h1`
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 2.2rem;
  color: var(--color-white);
`;

const Container = styled.section`
  padding: 2.1rem 3rem 3rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`;

const SearchContainer = styled.div`
  margin-left: auto;
`;

export default function MainContent({
  children,
  isOpen,
  onOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const path = useLocation().pathname;

  return (
    <Main>
      <Container>
        <Header>
          <ToggleButton isOpen={isOpen} onOpen={onOpen} />
          {path !== "/" && <Title>{routes.find((route) => route.path === path)?.label}</Title>}
          {path === "/" && (
            <SearchContainer>
              <SearchBar />
            </SearchContainer>
          )}
        </Header>
        {children}
      </Container>
    </Main>
  );
}
