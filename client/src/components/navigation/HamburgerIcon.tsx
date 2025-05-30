import styled from "styled-components";

const Container = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 30em) {
    display: block;
    position: absolute;
    top: 3.81rem;
    right: 2.5rem;
    transform: translateY(-50%);

    span {
      display: block;
      transition: all 0.3s ease-in-out;
      border-radius: 100rem;
      background-color: ${({ $isOpen }) => ($isOpen ? "var(--color-aqua)" : "var(--color-white)")};
      width: 3rem;
      height: 0.4rem;

      &:not(:last-child) {
        margin-bottom: 0.6rem;
      }

      &:nth-child(1) {
        transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "none")};
        transform-origin: top left;
      }

      &:nth-child(2) {
        background-color: ${({ $isOpen }) =>
          $isOpen ? "var(--color-grey-dark-01)" : "var(--color-white)"};
      }

      &:nth-child(3) {
        transform: ${({ $isOpen }) => ($isOpen ? "rotate(-45deg)" : "none")};
        transform-origin: bottom left;
      }
    }
  }
`;

export default function HamburgerIcon({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  return (
    <Container onClick={onOpen} $isOpen={isOpen}>
      <span></span>
      <span></span>
      <span></span>
    </Container>
  );
}
