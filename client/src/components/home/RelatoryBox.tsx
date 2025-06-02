import styled from "styled-components";
import { IDashboardEntity } from "../../../../server/src/Dashboard/DashboardEntity";
import { useEffect, useState } from "react";

const Container = styled.div`
  background-color: #430752;
  width: 90%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100px;
  height: 100px;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
`;

export const RelatoryBox = (data: IDashboardEntity): React.JSX.Element => {
  const [categories, setCategories] = useState<any>({});
  const [platforms, setPlatforms] = useState<any>({});
  const [price, setPrice] = useState<number>(0);
  const [avgRating, setAvgRating] = useState<any>(0);

  useEffect(() => {
    if (data.topCategory) {
      setCategories(JSON.parse(data.topCategory));
    }

    if (data.topPlatform) {
      setPlatforms(JSON.parse(data.topPlatform));
    }

    if (data.totalPrice) {
      setPrice(data.totalPrice / 100);
    }

    if (data.avgRating) {
      const result = data.avgRating.toFixed(2);
      setAvgRating(result);
    }
  }, []);

  return (
    <Container>
      <Box>${price}</Box>
      <Box>{avgRating}</Box>
      <Box>{categories.name}</Box>
      <Box>
        <ImageBox src={platforms.imageUrl} draggable={false} />
      </Box>
      <Box>{data.totalFavorites}</Box>
      <Box>{data.totalAbandoned}</Box>
      <Box>{data.totalDone}</Box>
      <Box>{data.totalPlaying}</Box>
    </Container>
  );
};
