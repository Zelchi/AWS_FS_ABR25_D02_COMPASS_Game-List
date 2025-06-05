import SiteLayout from "@/components/global/SiteLayout";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";
import { ShortcutCards } from "@/components/global/ShortcutCards";
import { IStatistics } from "@/types/types";
import { Statistics } from "@/components/global/Statistics";
import { useGlobal } from "@/contexts/globalContext";
import { useEffect, useState } from "react";
import { Remainder } from "@/components/global/Remainder";
import { IGameEntity } from "../../../server/src/Game/GameEntity";

const Container = styled(SiteLayout)`
  padding: 0rem 6rem 4rem;
  background-color: var(--color-grey-dark-02);

  @media (max-width: 84em) {
    padding: 0rem 4rem;
  }

  @media (max-width: 48em) {
    padding: 2rem;
  }

  @media (max-width: 30em) {
    padding: 0;
  }
`;

const Greeting = styled.h1`
  margin-bottom: 0.5rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 2.8rem;
  color: var(--color-white);
`;

const SubGreeting = styled.p`
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 2.2rem;
  color: var(--color-grey-08);

  @media (max-width: 48em) {
    font-size: 1.8rem;
  }
`;

const ShortcutContainer = styled(ShortcutCards)`
  margin-top: 2rem;
  margin-bottom: 5rem;

  @media (max-width: 48em) {
    margin-bottom: 3rem;
  }
`;

const RemainderContainer = styled(Remainder)`
  margin-bottom: 4rem;
`;

export default function Home() {
  const { user, handleUserName } = useGlobal();

  const { data: dataStatistics } = useQuery({
    queryKey: ["relatoryAndStatus"],
    queryFn: (): Promise<{ data: IStatistics }> => API.GET("dashboard"),
    staleTime: 20 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (dataStatistics) handleUserName();
  }, [dataStatistics, handleUserName]);

  return (
    <Container>
      <RemainderContainer />
      <Greeting>{`Hello, ${user}!`}</Greeting>
      <SubGreeting>Choose one of the options below</SubGreeting>
      <ShortcutContainer data={dataStatistics?.data} />
      <Statistics data={dataStatistics} />
    </Container>
  );
}
