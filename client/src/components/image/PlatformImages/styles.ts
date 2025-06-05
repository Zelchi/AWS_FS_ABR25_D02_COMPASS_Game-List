import styled from "styled-components";
import SmartImage from "@/components/logic/SmartImage";
import { flexCenter } from "@/styles/mixins";
import Icon from "@/components/image/Icon/Icon";

export const Container = styled.span`
  ${flexCenter};

  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 8rem;
`;

export const Image = styled(SmartImage)`
  width: 2.5rem;
  height: 2.5rem;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

export const StyledIcon = styled(Icon)`
  width: 2.2rem;
  height: 2.2rem;
  fill: ${({ theme }) => theme.colors.grey04};
  stroke: none;
`;
