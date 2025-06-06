import React, { ChangeEvent } from "react";

type InputType = {
  className?: "string";
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

export function Input({
  className,
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
  if (type === "textarea") {
    return (
      <textarea
        className={className}
        id={name}
        value={value || ""}
        onChange={onChange}
        required={required}
      />
    );
  }

  return (
    <input
      className={className}
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
  );
}
