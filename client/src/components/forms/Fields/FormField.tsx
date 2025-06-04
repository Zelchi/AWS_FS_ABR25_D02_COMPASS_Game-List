import { ChangeEvent } from 'react';

interface FormFieldProps {
  onChange: (e: ChangeEvent<any>) => void;
  id: string;
  label: string;
  type?: string;
  value: string | number | undefined;
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  min,
  max,
  step,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value || ''}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value || ''}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          step={step}
        />
      )}
    </div>
  );
}