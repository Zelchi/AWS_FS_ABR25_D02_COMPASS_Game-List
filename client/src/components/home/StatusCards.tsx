import styled from "styled-components";
import { IDashboardEntity } from "../../../../server/src/Dashboard/DashboardEntity";

const StatusBox = styled.div`
  background-color: lightblue;
  width: 90%;
  height: 200px;
`;

const StatusCard = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StatusCards = (data: IDashboardEntity): React.JSX.Element => {
  return (
    <StatusBox className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatusCard>Jogos: {data.totalGames}</StatusCard>
      <StatusCard>Categorias : {data.totalCategories}</StatusCard>
      <StatusCard>Plataformas : {data.totalPlatforms}</StatusCard>
    </StatusBox>
  );
};
