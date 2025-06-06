import React, { useState } from "react";
import Button from "@/components/button/Button";
import {
  ModalOverlay,
  ModalContent,
  ModalList,
  SelectItem,
  ModalFooter,
} from "@/components/modal/ModalSelection/styles";
import { ButtonSet } from "@/components/forms/styles";

export interface SelectionModalProps {
  title: string;
  items: { id: string; name: string }[];
  selectedItemIds: string[];
  onConfirm: (selectedIds: string[]) => void;
  onCancel: () => void;
}

export function ModalSelection({
  title,
  items,
  selectedItemIds,
  onConfirm,
  onCancel,
}: SelectionModalProps) {
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>(selectedItemIds);

  const handleItemToggle = (id: string, checked: boolean) => {
    if (checked) {
      setLocalSelectedIds((prev) => [...prev, id]);
    } else {
      setLocalSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleCancel = () => {
    setLocalSelectedIds([]);
    onCancel();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{title}</h2>
        <ModalList>
          {items.length > 0 ? (
            items.map((item) => (
              <SelectItem key={item.id}>
                <input
                  id={`modal-item-${item.id}`}
                  type="checkbox"
                  checked={localSelectedIds.includes(item.id)}
                  onChange={(e) => handleItemToggle(item.id, e.target.checked)}
                />
                <label htmlFor={`modal-item-${item.id}`}>{item.name}</label>
              </SelectItem>
            ))
          ) : (
            <div>No items available</div>
          )}
        </ModalList>
        <ModalFooter>
          <ButtonSet>
            <Button type="button" variant="danger" size="large" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" size="large" onClick={() => onConfirm(localSelectedIds)}>
              {" "}
              Confirm
            </Button>
          </ButtonSet>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
