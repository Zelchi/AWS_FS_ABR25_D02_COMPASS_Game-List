import { IGameEntity } from "../../../server/src/Game/GameEntity";
import styled from "styled-components";
import Button from "@/components/global/Button";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  display: flex;
  background-color: var(--color-white);
  border-radius: 2rem;
  overflow: hidden;
`;

const Image = styled.div<{ $background: string }>`
  margin-left: -20%;
  width: 90%;
  height: 100%;
  background-image: url(${({ $background }) => $background});
  background-size: cover;
  background-position: center;
  clip-path: circle(50% at 50% 50%);
`;

const Title = styled.div`
  position: absolute;
  bottom: 3rem;
  left: -5%;
  background-color: var(--color-aqua);
  transform: skewX(-35deg);
  padding: 0.5rem 10rem;
  box-shadow: 2rem 1.5rem 0 var(--color-grey-dark-03);

  p {
    position: relative;
    transform: skewX(35deg);
    color: var(--color-grey-dark-03);
    font-weight: 600;
    font-size: 2rem;
    font-family: var(--font-primary);
  }
`;

const QuestionContainer = styled.div`
  width: 50%;
  padding: 2rem;
  padding-left: 0;
`;

const Question = styled.p`
  font-family: var(--font-primary);
  font-weight: 800;
  font-size: 3.5rem;
  color: var(--color-black);
`;

const ButtonSet = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;

  button {
    width: fit-content;
    color: var(--color-grey-dark-03);

    &:hover,
    &:focus {
      color: var(--color-white);
    }

    &:last-child {
      background-color: var(--color-grey-dark-03);
      color: var(--color-white);

      &:hover,
      &:focus {
        background-color: var(--color-pink);
      }
    }
  }
`;

type RemainderProps = {
  data: IGameEntity[];
  className?: string;
};

export function Remainder({ data, className }: RemainderProps) {
  return (
    <Container className={className}>
      <Image $background={data[0].imageUrl}></Image>
      <Title>
        <p>{data[0].name}</p>
      </Title>
      <QuestionContainer>
        <Question>Are you still playing {data[0].name}?</Question>
        <ButtonSet>
          <Button size={"large"}>Yes</Button>
          <Button size={"large"}>No, it's finished</Button>
          <Button size={"large"}>I quit</Button>
        </ButtonSet>
      </QuestionContainer>
    </Container>
  );
}
