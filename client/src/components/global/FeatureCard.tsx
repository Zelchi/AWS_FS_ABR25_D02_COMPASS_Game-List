import React from "react";
import styled from "styled-components";
import { useGlobal } from "@/contexts/globalContext";
import PlusIcon from "@/assets/plus.svg?react";
import { useMediaQuery } from "react-responsive";
import { useModal } from "@/contexts/modalContext";

const laptopL = 90;
const laptopM = 84;
const laptopS = 67;
const mobile = 30;

const Card = styled.div`
  width: 100%;
  padding: 2rem;
  display: grid;
  align-items: center;
  grid-template-columns: 5.5rem auto 2fr;
  gap: 2rem;
  background-color: var(--color-grey-dark-03);
  border: 1px solid var(--color-grey-02);
  border-radius: 0.8rem;
  position: relative;
  transition: var(--transition);

  &:has(button:hover, button:focus) {
    border: 1px solid var(--color-white);
    background-color: var(--color-aqua-dark);
  }

  @media (max-width: ${laptopL}em) {
    grid-template-columns: auto auto 2fr;
    align-items: flex-end;
  }

  @media (max-width: ${laptopM}em) {
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: ${mobile}em) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const Icon = styled.span`
  height: 100%;
  stroke: var(--color-white);
  fill: var(--color-white);
  display: flex;
  align-items: center;

  @media (max-width: ${laptopL}em) {
    width: 4rem;
  }

  @media (max-width: ${laptopM}em) {
    margin-bottom: -0.5rem;
  }

  @media (max-width: ${mobile}em) {
    width: 2.5rem;
  }
`;

const Stat = styled.span`
  line-height: 1;
  color: var(--color-white);
  font-family: var(--font-primary);
  font-size: 5.2rem;
  font-weight: 700;
  text-transform: uppercase;

  @media (max-width: ${laptopL}em) {
    font-size: 6.5rem;
    line-height: 0.8;
  }

  @media (max-width: ${laptopM}em) {
    margin-left: auto;
    font-size: 3rem;
    line-height: 0.8;
  }

  @media (max-width: ${mobile}em) {
    margin-left: unset;
    font-size: 2rem;
  }
`;

const Title = styled.span`
  line-height: 1;
  font-family: var(--font-primary);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-white);

  @media (max-width: ${laptopL}em) {
    font-size: 1.2rem;
  }

  @media (max-width: ${laptopM}em) {
    font-weight: 400;
    font-size: 1.4rem;
  }
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--color-white);
  color: var(--color-grey-02);
  line-height: 1;
  font-family: var(--font-primary);
  font-size: 1.4rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  transition: var(--transition);

  &:hover,
  &:focus {
    color: var(--color-aqua-dark);

    svg {
      stroke: var(--color-aqua-dark);
    }
  }

  svg {
    width: 0.6rem;
    height: 0.6rem;
    stroke: var(--color-grey-02);
    transition: var(--transition);
  }

  @media (max-width: ${laptopL}em) {
    display: flex;
    gap: 1rem;
    height: 100%;
    font-weight: 600;

    & > :last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  @media (max-width: ${laptopM}em) {
    gap: 0.5rem;

    & > :last-child {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }

    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }

  @media (max-width: ${laptopS}em) {
    flex-wrap: wrap;
    gap: 0.2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: ${laptopL}em) {
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: ${laptopM}em) {
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
  }

  @media (max-width: ${mobile}em) {
    gap: 0.5rem;
  }
`;

type FeatureCardProps = {
    icon: React.JSX.Element;
    title: string;
    qty: number | undefined;
};

export default function FeatureCard({ icon, qty, title }: FeatureCardProps) {
    const { isLaptop, isLaptopL, isMobile } = useGlobal();
    const isLaptopM = useMediaQuery({ maxWidth: `${laptopM}em` });
    const { handleModalContent } = useModal();

    const handleClick = () => {
        if (title === "Games") {
            handleModalContent("/games");
        }
        if (title === "Categories") {
            handleModalContent("/categories");
        }
        if (title === "Platforms") {
            handleModalContent("/platforms");
        }
    }

    return (
        <Card>
            {isMobile ? (
                <>
                    <Wrapper>
                        <Stat>{qty}</Stat>
                        <Icon>{icon}</Icon>
                    </Wrapper>
                    <AddButton onClick={handleClick}>
                        <PlusIcon />
                    </AddButton>
                </>
            ) : isLaptop ? (
                <>
                    <Wrapper>
                        <Icon>{icon}</Icon>
                        <Stat>{qty}</Stat>
                    </Wrapper>
                    <AddButton onClick={handleClick} >
                        <span>
                            <PlusIcon /> Add
                        </span>{" "}
                        {title}
                    </AddButton>
                </>
            ) : isLaptopM ? (
                <>
                    <Wrapper>
                        <Icon>{icon}</Icon>
                        <Title>{title}</Title>
                        <Stat>{qty}</Stat>
                    </Wrapper>
                    <AddButton onClick={handleClick}>
                        <PlusIcon /> Add new
                    </AddButton>
                </>
            ) : isLaptopL ? (
                <>
                    <Wrapper>
                        <Icon>{icon}</Icon>
                        <Title>{title}</Title>
                    </Wrapper>
                    <Stat>{qty}</Stat>
                    <AddButton onClick={handleClick} >
                        <span>
                            <PlusIcon />
                        </span>
                        <span>
                            <span>Add</span> <span>new</span>
                        </span>
                    </AddButton>
                </>
            ) : (
                <>
                    <Icon>{icon}</Icon>
                    <Stat>{qty}</Stat>
                    <Wrapper>
                        <Title>{title}</Title>
                        <AddButton onClick={handleClick} >
                            <PlusIcon /> Add new
                        </AddButton>
                    </Wrapper>
                </>
            )}
        </Card>
    );
}
