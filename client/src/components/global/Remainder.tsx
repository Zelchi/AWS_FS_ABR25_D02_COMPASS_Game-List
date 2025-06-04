import { IGameEntity } from "../../../../server/src/Game/GameEntity";
import styled from "styled-components";
import Button from "@/components/global/Button";
import SmartImage from "@/components/global/SmartImage";
import defaultImage from "@/assets/default-image.jpg";
import { useState } from "react";
import API from "@/utils/API";
import StarRating from "@/components/global/StarRating";
import { useGlobal } from "@/contexts/globalContext";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

const laptopS = 67;
const mobile = 30;

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  border-radius: 2rem;
  overflow: hidden;

  @media (max-width: ${laptopS}em) {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 2.2rem;
  }

  @media (max-width: ${mobile}em) {
    flex-direction: column;
    padding-top: 0;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;

  @media (max-width: ${laptopS}em) {
    display: flex;
    align-items: center;
    width: fit-content;
  }

  @media (max-width: ${mobile}em) {
    height: auto;
  }
`;

const Image = styled(SmartImage)`
  display: block;
  width: 120%;
  height: 100%;
  margin-left: -20%;
  clip-path: circle(50% at 50% 50%);

  @media (max-width: ${laptopS}em) {
    margin-left: 0;
    width: 15rem;
    height: 15rem;
  }

  @media (max-width: ${mobile}em) {
    clip-path: unset;
    width: 45rem;
    height: 15rem;
  }
`;

const Title = styled.div`
  max-width: 95%;
  position: absolute;
  bottom: 3rem;
  left: -3rem;
  background-color: var(--color-aqua);
  padding: 0.5rem 8rem;
  transform: skew(-35deg);
  box-shadow: 2rem 1.5rem 0 var(--color-grey-dark-03);

  p {
    position: relative;
    transform: skew(35deg);
    width: fit-content;
    color: var(--color-grey-dark-03);
    font-weight: 600;
    font-size: 2rem;
    font-family: var(--font-primary);
  }
`;

const TitleTag = styled.p`
  width: fit-content;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: var(--color-white);
  background-color: var(--color-aqua-dark);
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
`;

const QuestionContainer = styled.div`
  width: 50%;
  padding: 2rem;
  padding-left: 0;

  @media (max-width: ${laptopS}em) {
    padding: 0;
    width: auto;
  }
`;

const QuestionWrapper = styled.div`
  width: fit-content;
  margin-left: auto;
  padding-right: 4rem;

  @media (max-width: ${laptopS}em) {
    padding: 0;
  }

  @media (max-width: ${mobile}em) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Question = styled.p`
  max-width: 100%;
  display: inline-block;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 800;
  font-size: 3.5rem;
  color: var(--color-black);

  @media (max-width: ${laptopS}em) {
    font-size: 2.6rem;
  }

  @media (max-width: ${mobile}em) {
    text-align: center;
  }
`;

const ButtonSet = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;

  button {
    flex-shrink: 0;
    width: fit-content;
    color: var(--color-grey-dark-03);
    font-size: 1.2rem;

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

  @media (max-width: ${laptopS}em) {
    flex-wrap: wrap;

    button {
      padding: 1rem;
      font-size: 1rem;
    }
  }
`;

const Rating = styled(StarRating)`
  font-family: var(--font-primary);
  font-weight: 800;
  margin-top: 2rem;
`;

const Wrapper = styled.div`
  margin-top: 4rem;
  transition: all 3s;

  @media (max-width: 48em) {
    margin-top: 1rem;
  }
`;

export function Remainder({ className }: { className?: string }) {
  const { isLaptop } = useGlobal();

  const { data, refetch } = useQuery({
    queryKey: ["gameReminder"],
    queryFn: (): Promise<{ data: IGameEntity[] }> => API.GET("dashboard/ask"),
    staleTime: 20 * 60 * 1000,
    retry: false,
    placeholderData: (previousData) => previousData,
  });

  const [rating, setRating] = useState<number>(0);
  const [isRating, setIsRating] = useState(false);

  const game = data?.data[0];
  const gamesKey = data ? "remainder" : null;

  const handleClick = async () => {
    setTimeout(async () => {
      await refetch();
      setIsRating(false);
      setRating(0);
    }, 500);
  };

  const handlePlaying = async () => {
    const res = await API.PUT(`/game/${game?.id}`, game || {});
    if (res.status === 200) await handleClick();
  };

  const handleFinished = async (rating: number) => {
    const res = await API.PUT(`/game/${game?.id}`, {
      rating,
      status: "done",
    });
    if (res.status === 200) await handleClick();
  };

  const handleAbandoned = async () => {
    const res = await API.PUT(`/game/${game?.id}`, { status: "abandoned" });
    if (res.status === 200) await handleClick();
  };

  const handleIsRating = () => setIsRating(true);

  const handleRating = async (rating: number) => {
    setRating(rating);
    await handleFinished(rating);
  };

  console.log(game);

  return (
    <AnimatePresence mode="wait">
      {game ? (
        <motion.div
          key={gamesKey}
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Wrapper>
            <AnimatePresence mode="wait">
              <Container
                className={className}
                layout
                key={game?.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
              >
                <ImageContainer>
                  <Image src={game?.imageUrl || defaultImage} fallback={defaultImage} />
                  {!isLaptop && (
                    <Title>
                      <p>{game?.name}</p>
                    </Title>
                  )}
                </ImageContainer>
                <QuestionContainer>
                  <QuestionWrapper>
                    {isLaptop && <TitleTag>{game?.name}</TitleTag>}
                    <Question>Are you still playing?</Question>
                    <AnimatePresence mode="wait">
                      {isRating ? (
                        <motion.div
                          key="rating"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Rating onSetRating={handleRating} color="var(--color-aqua)" size={36} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="buttons"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ButtonSet>
                            <Button size="large" onClick={handlePlaying}>
                              Yes
                            </Button>
                            <Button size="large" onClick={handleIsRating}>
                              No, it's finished
                            </Button>
                            <Button size="large" onClick={handleAbandoned}>
                              I quit
                            </Button>
                          </ButtonSet>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </QuestionWrapper>
                </QuestionContainer>
              </Container>
            </AnimatePresence>
          </Wrapper>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  );
}
