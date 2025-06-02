import styled from "styled-components";
import { Logo } from "@/components/global/Logo";
import Navigation from "@/components/navigation/Navigation";
import HamburgerIcon from "@/components/navigation/HamburgerIcon";
import { useState } from "react";

const SideBarEl = styled.aside<{ $isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-grey-dark-01);
  border-right: 0.2rem solid var(--color-grey-light-03);
  overflow: hidden;
  z-index: 999;

  @media (max-width: 48em) {
    border-right: none;
    border-bottom: 0.2rem solid var(--color-grey-light-03);
    z-index: 9999;
  }

  @media (max-width: 30em) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  width: 11.8rem;
  margin-top: 2.4rem;
  margin-bottom: 3.2rem;

  @media (max-width: 48em) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((is) => !is);

  return (
    <SideBarEl $isOpen={isOpen}>
      <LogoContainer>
        <a href="/">
          <Logo />
        </a>
      </LogoContainer>
      <Navigation isOpen={isOpen} />
      <HamburgerIcon isOpen={isOpen} onOpen={handleOpen} />
    </SideBarEl>
  );
}
