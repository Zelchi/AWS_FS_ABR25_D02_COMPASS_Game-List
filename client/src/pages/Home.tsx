import SiteLayout from "@/components/global/SiteLayout";
import styled from "styled-components";
import { StatusCards } from "@/components/home/StatusCards";
import { AskCards } from "@/components/home/AskCards";
import { RelatoryBox } from "@/components/home/RelatoryBox";
import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default function Home() {
  const { data } = useQuery({
    queryKey: ["relatoryAndStatus"],
    queryFn: () => API.GET('dashboard'),
    staleTime: 20 * 60 * 1000,
    retry: false,
  });

  return (
    <SiteLayout>
      <Container>
        <AskCards />
        {data && data.data && <StatusCards {...data.data} />}
        {data && data.data && <RelatoryBox {...data.data} />}
      </Container>
    </SiteLayout>
  );
}
