// noinspection SpellCheckingInspection

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stats } from "@/components/dashboard/Stats/Stats";
import { useGlobal } from "@/contexts/globalContext";
import { TStatistics } from "@/types/types";
import API from "@/utils/API";
import {
  StyledSiteLayout,
  StyledRemainder,
  StyledShortcutsContainer,
  Greeting,
  SubGreeting,
} from "@/pages/Home/styles";

export default function Home() {
  const { user, handleUserName } = useGlobal();

  const { data } = useQuery({
    queryKey: ["relatoryAndStatus"],
    queryFn: (): Promise<TStatistics> => API.GET("dashboard").then((res) => res.data),
    staleTime: 20 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (data) void handleUserName();
  }, [data, handleUserName]);

  return (
    <StyledSiteLayout>
      <StyledRemainder />
      <Greeting>Hello {user}</Greeting>
      <SubGreeting>Choose one of the options below</SubGreeting>
      <StyledShortcutsContainer data={data} />
      <Stats data={data} />
    </StyledSiteLayout>
  );
}
