import sadFace from "@/assets/imgs/sad-face-finish.svg";
import signOutIcon from "@/assets/icons/sign-out-outline.svg";
import {
  Wrapper,
  ErrorContainer,
  SadFace,
  Message,
  SubMessage,
  ButtonWrapper,
  BackButton,
  Icon,
} from "@/pages/NotFound/styles";

export default function NotFound() {
  return (
    <Wrapper>
      <ErrorContainer>
        <SadFace draggable={false} src={sadFace} alt="Sad face" />
      </ErrorContainer>
      <Message>Oops! Page not found</Message>
      <SubMessage>The page you’re looking for doesn’t exist or was moved.</SubMessage>
      <ButtonWrapper>
        <BackButton to="/">
          BACK TO HOME
          <Icon draggable={false} src={signOutIcon} alt="Arrow icon" />
        </BackButton>
      </ButtonWrapper>
    </Wrapper>
  );
}
