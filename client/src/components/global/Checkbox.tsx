import React from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const CustomCheckbox = styled.span`
  width: 3.28rem;
  height: 3.28rem;
  border: none;
  border-radius: 0.4rem;
  background: var(--color-white);
  display: inline-block;
  transition: all 0.2s ease-in-out;

  ${HiddenCheckbox}:checked + & {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-aqua);
  }

  ${HiddenCheckbox}:checked + &::after {
    display: block;
    transform: rotate(45deg);
    margin-top: -0.5rem;
    border: solid var(--color-white);
    border-width: 0 0.4rem 0.4rem 0;
    width: 0.8rem;
    height: 1.6rem;
    content: "";
  }
`;

export default function Checkbox({
  isFavorite,
  onFavorite,
}: {
  isFavorite: boolean;
  onFavorite: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox checked={isFavorite} onChange={onFavorite} />
      <CustomCheckbox />
    </CheckboxWrapper>
  );
}
