import { Container } from "@/components/navigation/HamburgerIcon/styles";

export default function HamburgerIcon({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) {
  return (
    <Container onClick={onOpen} $isOpen={isOpen}>
      <span></span>
      <span></span>
      <span></span>
    </Container>
  );
}
