import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import SideBar from "@/components/navigation/SideBar";
import MainContent from "@/components/global/MainContent";

const Container = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isOpen }) => ($isOpen ? "27rem calc(100% - 27rem)" : "0% 100%")};
  transition: grid-template-columns 0.3s ease-in-out;

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
