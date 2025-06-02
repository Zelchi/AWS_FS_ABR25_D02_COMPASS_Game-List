import SiteLayout from "@/components/global/SiteLayout";
import FeatureCard from "@/components/global/FeatureCard";
import controllerIcon from "@/assets/controller-outline2.svg";
import tagIcon from "@/assets/tag-outline2.svg";
import chipIcon from "@/assets/hardware-chip-outline.svg";
import starIcon from "@/assets/star-outline2.svg";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";

const Row = styled.div`
  display: flex;
  gap: 15rem;
  width: 88.8rem;
  height: 17.3rem;
  margin-top: 15rem;
  margin-left: 5.5rem;
`;

const Greeting = styled.h1`
  position: absolute;
  top: 7.6rem;
  left: 35.4rem;
  width: 17rem;
  height: 3.4rem;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 2.8rem;
  line-height: 100%;
  color: var(--color-white);
`;

const SubGreeting = styled.p`
  position: absolute;
  top: 11rem;
  left: 35.4rem;
  width: 32.3rem;
  height: 2.7rem;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 2.2rem;
  line-height: 100%;
  color: #9d9d9d;
`;

export default function Home() {
  const { data } = useQuery({
    queryKey: ["relatoryAndStatus"],
    queryFn: () => API.GET("dashboard"),
    staleTime: 20 * 60 * 1000,
    retry: false,
  });

  console.log(data);

  return (
    <SiteLayout>
      <Greeting>Hello, Juan!</Greeting>
      <SubGreeting>Choose one of options below.</SubGreeting>
      <Row>
        <FeatureCard iconSrc={controllerIcon} title="Games" number="243" showButton />
        <FeatureCard iconSrc={tagIcon} title="Categories" number="13" showButton />
      </Row>

      <Row style={{ marginTop: "5.1rem" }}>
        <FeatureCard iconSrc={chipIcon} title="Platforms" number="4" showButton />
        <FeatureCard iconSrc={starIcon} title="Favorite Games" number="3" />
      </Row>
    </SiteLayout>
  );
}
