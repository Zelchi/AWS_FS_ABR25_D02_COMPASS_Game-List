import styled from "styled-components";
import { Link } from "react-router-dom";
import sadFace from "@/assets/sad-face-finish.svg";
import signoutIcon from "@/assets/signout-outline.svg";

export default function NotFoundPage() {
  return (
    <Wrapper>
      <ErrorContainer>
        <SadFace src={sadFace} alt="Sad face" />
      </ErrorContainer>
      <Message>Oops! Page not found</Message>
      <SubMessage>The page you’re looking for doesn’t exist or was moved.</SubMessage>
      <ButtonWrapper>
        <BackButton to="/">
          BACK TO HOME
          <Icon src={signoutIcon} alt="Arrow icon" />
        </BackButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  background-color: var(--color-grey-dark-01);
  color: var(--color-yellow-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SadFace = styled.img`
  width: 100rem;
  height: auto;
`;

const Message = styled.h1`
  font-size: 2.4rem;
  font-family: var(--font-primary);
  font-weight: 700;
  margin-top: 0.5rem;
`;

const SubMessage = styled.p`
  font-size: 1.6rem;
  font-family: var(--font-primary);
  color: var(--color-grey-01);
  margin-top: 1rem;
  white-space: nowrap;
  max-width: 100%;  
`;

const ButtonWrapper = styled.div`
  margin-top: 2.5rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  padding: 0.8rem 2rem;
  font-size: 1.4rem;
  font-family: var(--font-primary);
  font-weight: 600;
  color: var(--color-grey-dark-01);
  background-color: var(--color-yellow-light);
  border-radius: 0.8rem;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background-color: var(--color-grey-light-02);
  }
`;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;
