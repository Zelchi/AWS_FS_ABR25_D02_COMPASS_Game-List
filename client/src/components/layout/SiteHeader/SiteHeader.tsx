import React from "react";
import { useLocation } from "react-router-dom";
import ToggleButton from "@/components/layout/ToggleButton/ToggleButton";
import { routes } from "@/routes/routes";
import { Header, Title, Separator, StyledButton } from "@/components/layout/SiteHeader/styles";
import { useModal } from "@/contexts/modalContext";
import { useGlobal } from "@/contexts/globalContext";

export default function SiteHeader({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  const { isMobile } = useGlobal();
  const path = useLocation().pathname;
  const { handleModalContent } = useModal();

  return (
    <div>
      <Header>
        <ToggleButton isOpen={isOpen} onOpen={onOpen} />
        {path !== "/" && (
          <>
            <Title>{routes.find((route) => route.path === path)?.label}</Title>
            {isMobile && <Separator />}
            <StyledButton
              size="medium"
              full={isMobile}
              onClick={() => handleModalContent(path, {})}
            >
              Add new {routes.find((route) => route.path === path)?.singular}
            </StyledButton>
          </>
        )}
      </Header>
      {path !== "/" && !isMobile && <Separator />}
    </div>
  );
}
