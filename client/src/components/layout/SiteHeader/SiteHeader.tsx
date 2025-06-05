import React from "react";
import { useLocation } from "react-router-dom";
import ToggleButton from "@/components/layout/ToggleButton/ToggleButton";
import { routes } from "@/routes/routes";
import GameForm from "@/components/forms/GameForm/GameForm";
import CategoryForm from "@/components/forms/CategoryForm/CategoryForm";
import PlatformForm from "@/components/forms/PlatformForm/PlatformForm";
import { Header, Title, Separator, StyledButton } from "@/components/layout/SiteHeader/styles";
import { useModal } from "@/contexts/modalContext";
import { useGlobal } from "@/contexts/globalContext";

export default function SiteHeader({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  const { isMobile } = useGlobal();
  const path = useLocation().pathname;
  const { setModalContent, setIsModalOpen } = useModal();

  const handleButtonClick = () => {
    setModalContent(() => {
      switch (path) {
        case "/Games":
          return <GameForm />;
        case "/Categories":
          return <CategoryForm />;
        case "/Platforms":
          return <PlatformForm />;
        default:
          return null;
      }
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header>
        <ToggleButton isOpen={isOpen} onOpen={onOpen} />
        {path !== "/" && (
          <>
            <Title>{routes.find((route) => route.path === path)?.label}</Title>
            {isMobile && <Separator />}
            <StyledButton size="medium" full={isMobile} onClick={handleButtonClick}>
              Add new {routes.find((route) => route.path === path)?.singular}
            </StyledButton>
          </>
        )}
      </Header>
      {path !== "/" && !isMobile && <Separator />}
    </div>
  );
}
