import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import { Container, Wrapper } from "@/components/dashboard/Remainder/styles";
import RemainderImage from "@/components/dashboard/Remainder/RemainderImage";
import RemainderQuestion from "./RemainderQuestion";
import { fadeInUpBlur, fadeOutHeight } from "@/styles/animations";
import API from "@/utils/API";
import { toast } from "react-toastify";

export function Remainder({ className }: { className?: string }) {
  const [isRating, setIsRating] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["gameReminder"],
    queryFn: (): Promise<{ data: IGameEntity[] }> => API.GET("dashboard/ask"),
    staleTime: 20 * 60 * 1000,
    retry: false,
    placeholderData: (previousData) => previousData,
  });

  const game = data?.data[0];
  const gamesKey = data ? "remainder" : null;

  const handleClick = async () => {
    toast.success("Game status updated successfully!");
    setTimeout(async () => {
      await refetch();
      setIsRating(false);
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
    await handleFinished(rating);
  };

  return (
    <AnimatePresence mode="wait">
      {game ? (
        <motion.div key={gamesKey} layout {...fadeOutHeight}>
          <Wrapper>
            <AnimatePresence mode="wait">
              <Container className={className} layout key={game?.id} {...fadeInUpBlur}>
                <RemainderImage gameImage={game?.imageUrl} gameTitle={game?.name} />
                <RemainderQuestion
                  gameTitle={game?.name}
                  isRating={isRating}
                  onPlaying={handlePlaying}
                  onAbandoned={handleAbandoned}
                  onIsRating={handleIsRating}
                  onRate={handleRating}
                />
              </Container>
            </AnimatePresence>
          </Wrapper>
        </motion.div>
      ) : (
        <motion.div key="empty" layout {...fadeOutHeight} />
      )}
    </AnimatePresence>
  );
}
