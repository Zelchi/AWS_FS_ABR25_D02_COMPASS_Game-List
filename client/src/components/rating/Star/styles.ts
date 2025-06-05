import styled from "styled-components";
import Icon from "@/components/image/Icon/Icon";

export const StyledIcon = styled(Icon)<{ $size: number | undefined; $full: boolean }>`
  cursor: pointer;
  display: block;
  width: ${({ $size = 2.4 }) => $size / 10}rem;
  height: ${({ $size = 2.4 }) => $size / 10}rem;
  fill: ${({ theme, $full }) => ($full ? theme.colors.aqua : "none")};
  stroke: ${({ theme }) => theme.colors.aqua};
`;
