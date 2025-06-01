import More from "@/assets/more.svg?react";
import styled from "styled-components";

const Icon = styled(More)`
  width: 2.2rem;
  height: 2.2rem;
  fill: var(--color-grey-04);
`;

export default function MoreIcon() {
  return <Icon />;
}