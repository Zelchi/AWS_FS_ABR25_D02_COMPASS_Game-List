import styled from "styled-components";
import SearchIcon from "../../assets/search.svg?react";

const SearchContainer = styled.div`
  position: relative;
  width: 21.2rem;

  @media (max-width: 30em) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1.4rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.4rem;
  color: var(--color-black);
  border-radius: 0.8rem;
  border: none;

  &::placeholder {
    color: var(--color-grey-light-05);
  }
`;

const Label = styled.label`
  width: 1.4rem;
  position: absolute;
  right: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;

  fill: var(--color-grey-light-05);
`;

export default function SearchBar() {
  return (
    <SearchContainer>
      <Label>
        <SearchIcon />
      </Label>
      <Input placeholder="Search..."></Input>
    </SearchContainer>
  );
}
