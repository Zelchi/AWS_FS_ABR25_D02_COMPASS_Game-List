import styled from "styled-components";

export type FeatureCardProps = {
  iconSrc: string;
  title: string;
  number: string;
  showButton?: boolean;
};

export default function FeatureCard({
  iconSrc,
  number,
  title,
  showButton,
}: FeatureCardProps) {
  return (
    <Card>
      <Icon src={iconSrc} alt="Card icon" />
      <Title>{title}</Title>
      <Number>{number}</Number>
      {showButton && <AddButton>+ Add new</AddButton>}
    </Card>
  );
}

const Card = styled.div`
  width: 36rem;
  height: 17.3rem;
  background-color: var(--color-grey-dark-03);
  border: 1px solid var(--color-grey-02);
  border-radius: 0.8rem;
  position: relative;
`;

const Icon = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  position: absolute;
  top: 1.7rem;
  left: 2.1rem;
`;

const Title = styled.span`
  position: absolute;
  top: 8rem;
  left: 2rem;
  color: var(--color-white);
  font-family: var(--font-primary);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 100%;
`;

const Number = styled.span`
  position: absolute;
  top: 1.7rem;
  left: 29rem;
  color: var(--color-white);
  font-family: var(--font-primary);
  font-size: 3rem;
  font-weight: 700;
  line-height: 100%;
  text-transform: uppercase;
`;

const AddButton = styled.button`
  position: absolute;
  top: 12.7rem;
  left: 1.7rem;
  width: 11.2rem;
  height: 3rem;
  background-color: var(--color-white);
  color: var(--color-grey-02);
  font-family: var(--font-primary);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 100%;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
`;
