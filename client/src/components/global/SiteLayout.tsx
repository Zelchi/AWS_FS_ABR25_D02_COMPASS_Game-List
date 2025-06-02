import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import SideBar from "@/components/navigation/SideBar";
import SiteHeader from "@/components/global/SiteHeader";

const Container = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isOpen }) => ($isOpen ? "27rem calc(100% - 27rem)" : "0% 100%")};
  transition: all 0.4s cubic-bezier(0.61, -0.53, 0.44, 1.55);
  overflow-x: hidden;

  @media (max-width: 64em) {
    grid-template-columns: 25% 75%;
    grid-template-columns: ${({ $isOpen }) => ($isOpen ? "25% 75%" : "0% 100%")};
  }

  @media (max-width: 48em) {
    grid-template-rows: ${({ $isOpen }) =>
      $isOpen ? "12.08rem calc(100% - 12.08rem)" : "0% 100%"};
    grid-template-columns: 100%;
  }

  @media (max-width: 30em) {
    grid-template-rows: auto;
  }
`;

const MainContent = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-dark-02);
  padding: 2.1rem 3rem 3rem;

  @media (max-width: 30em) {
    padding-top: 10.58rem;
  }
`;

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen((is) => !is);
  };

  return (
    <Container $isOpen={isOpen}>
      <SideBar />
      <MainContent>
        <SiteHeader isOpen={isOpen} onOpen={handleOpen} />
        <section>{children}</section>
      </MainContent>
    </Container>
  );
}
