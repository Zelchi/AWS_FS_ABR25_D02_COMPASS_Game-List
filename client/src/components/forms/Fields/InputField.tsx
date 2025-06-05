import React, { ChangeEvent, ReactNode } from "react";
import { Container, Label, Input } from "@/components/forms/Fields/styles";

type InputType = {
  children: ReactNode;
  type?: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<any>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
};

export function InputField({
  children,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
  min = 0,
  max,
  step,
}: InputType) {
  return (
    <Container>
      <Label htmlFor={name}>{children}</Label>
      {type === "textarea" ? (
        <textarea id={name} value={value || ""} onChange={onChange} required={required} />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          step={step}
        />
      )}
    </Container>
  );
}
