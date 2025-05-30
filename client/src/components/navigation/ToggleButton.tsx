import Toggle from "../../assets/toggle.svg?react";
import styled from "styled-components";

const Button = styled.button<{ $isOpen: boolean }>`
  cursor: pointer;
  margin-right: 2rem;
  background: none;
  border: none;
  width: 1.8rem;
  transform-origin: center;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(0deg)" : "rotate(-180deg)")};
  transition: all 0.3s ease-in-out;

  span {
    display: block;
    fill: var(--color-grey-light-05);
    transition: var(--transition);

    &:hover {
      fill: var(--color-aqua);
    }
  }
`;

export default function ToggleButton({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  return (
    <Button onClick={onOpen} $isOpen={isOpen}>
      <span>
        <Toggle style={{ verticalAlign: "middle" }} />
      </span>
    </Button>
  );
}
