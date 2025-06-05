import { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 80%;
  max-width: 500px;
  max-height: 50vh;

  display: flex;
  flex-direction: column;
  background-color: white;
`;

const ModalList = styled.div`
  width: 100%;
  max-height: 300px;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SelectItem = styled.div`
  display: flex;
  align-items: center;
`;

export interface SelectionModalProps {
  title: string;
  items: { id: string; name: string }[];
  selectedItemIds: string[];
  onConfirm: (selectedIds: string[]) => void;
  onCancel: () => void;
}

export function SelectionModal({
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
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={() => onConfirm(localSelectedIds)}>
            Confirm
          </button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
