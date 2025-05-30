// CategoryForm.tsx
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import styled from "styled-components";

type Props = {
  onSubmit: (name: string) => void;
  onClose: () => void;
  defaultName?: string;
};

export function CategoryForm({ onSubmit, onClose, defaultName = "" }: Props) {
  const [name, setName] = useState(defaultName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ButtonGroup>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onClose} variant="outline">
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;
