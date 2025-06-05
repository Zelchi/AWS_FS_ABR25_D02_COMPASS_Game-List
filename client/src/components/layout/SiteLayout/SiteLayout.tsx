import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import SideBar from "@/components/layout/SideBar/SideBar";
import SiteHeader from "@/components/layout/SiteHeader/SiteHeader";
import { Container, MainContent } from "@/components/layout/SiteLayout/styles";

export default function SiteLayout({ children, className }: React.HTMLAttributes<HTMLElement>) {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen((is) => !is);
  };

  return (
    <Container $isOpen={isOpen}>
      <SideBar />
      <MainContent>
        <Modal />
        <SiteHeader isOpen={isOpen} onOpen={handleOpen} />
        <section className={className}>{children}</section>
      </MainContent>
    </Container>
  );
}
