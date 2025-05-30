import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import SideBar from "@/components/navigation/SideBar";
import MainContent from "@/components/global/MainContent";

const Container = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isOpen }) => ($isOpen ? "27rem calc(100% - 27rem)" : "0% 100%")};
  transition: grid-template-columns 0.4s cubic-bezier(0.61, -0.53, 0.44, 1.55);
  overflow-x: hidden;

  @media (max-width: 64em) {
    grid-template-columns: 25% 75%;
  }

  @media (max-width: 48em) {
    grid-template-columns: 100%;
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
      <MainContent isOpen={isOpen} onOpen={handleOpen}>
        {children}
      </MainContent>
    </Container>
  );
}
