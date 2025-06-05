import { useState } from "react";
import { Logo } from "@/components/image/Logo/Logo";
import Navigation from "@/components/navigation/Navigation/Navigation";
import HamburgerIcon from "@/components/navigation/HamburgerIcon/HamburgerIcon";
import { StyledSideBar, LogoContainer } from "@/components/layout/SideBar/styles";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((is) => !is);

  return (
    <StyledSideBar $isOpen={isOpen}>
      <LogoContainer>
        <a href="/client/public">
          <Logo />
        </a>
      </LogoContainer>
      <Navigation isOpen={isOpen} />
      <HamburgerIcon isOpen={isOpen} onOpen={handleOpen} />
    </StyledSideBar>
  );
}
