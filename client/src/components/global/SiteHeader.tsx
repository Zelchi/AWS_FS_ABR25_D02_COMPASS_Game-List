import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ToggleButton from "@/components/navigation/ToggleButton";
import Button from "@/components/global/Button";
import { useMediaQuery } from "react-responsive";
import { useModal } from "@/contexts/modalContext";

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

  @media (max-width: 30em) {
    flex-direction: column;
    align-items: flex-start;
  }
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

  @media (max-width: 30em) {
    margin: 1.5rem 0 2rem;
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: auto;

  @media (max-width: 30em) {
    margin: 0;
    margin-bottom: 3rem;
    width: 100%;

    & > * {
      width: 100%;
    }
  }
`;

export default function SiteHeader({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
    const isMobile = useMediaQuery({ maxWidth: 30 * 16 });
    const path = useLocation().pathname;
    const { handleModalContent } = useModal();

    return (
        <>
            <Header>
                <ToggleButton isOpen={isOpen} onOpen={onOpen} />
                {path !== "/" && (
                    <>
                        {isMobile ? (
                            <>
                                <Title>{routes.find((route) => route.path === path)?.label}</Title>
                                {path !== "/" && <Separator />}
                                <ButtonWrapper>
                                    <Button size="medium" onClick={() => handleModalContent(path)}>
                                        Add new{" "}
                                        {path === "/games" ? "game" : path === "/categories" ? "category" : "platform"}
                                    </Button>
                                </ButtonWrapper>
                            </>
                        ) : (
                            <>
                                <Title>{routes.find((route) => route.path === path)?.label}</Title>
                                <ButtonWrapper>
                                    <Button size="medium" onClick={() => handleModalContent(path)}>
                                        Add new{" "}
                                        {path === "/games" ? "game" : path === "/categories" ? "category" : "platform"}
                                    </Button>
                                </ButtonWrapper>
                            </>
                        )}
                    </>
                )}
            </Header>
            {path !== "/" && !isMobile && <Separator />}
        </>
    );
}
