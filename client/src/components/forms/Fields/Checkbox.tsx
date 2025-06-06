import React from "react";
import { CheckboxWrapper, HiddenCheckbox, CustomCheckbox } from "@/components/forms/styles";

export default function Checkbox({
  className,
  id,
  checked,
  onChange,
}: {
  className?: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <CheckboxWrapper className={className}>
      <HiddenCheckbox id={id} checked={checked} onChange={onChange} type="checkbox" />
      <CustomCheckbox />
    </CheckboxWrapper>
  );
}
