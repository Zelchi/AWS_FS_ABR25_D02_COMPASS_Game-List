import { useState } from "react";
import { ModalSelection } from "@/components/modal/ModalSelection/ModalSelection";
import { StyledButton, SelectedOptions } from "@/components/forms/GameForm/SelectMany/styles";

export interface SelectionFieldProps {
  label: string;
  modalTitle: string;
  items: { id: string; name: string }[];
  selectedItemIds: string[];
  loading: boolean;
  onConfirm: (selectedIds: string[]) => void;
}

export function SelectMany({
  label,
  modalTitle,
  items,
  selectedItemIds,
  loading,
  onConfirm,
}: SelectionFieldProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = (ids: string[]) => {
    onConfirm(ids);
    setShowModal(false);
  };

  return (
    <>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <StyledButton onClick={() => setShowModal(true)}>{`Select ${label}`}</StyledButton>
            <SelectedOptions>
              {selectedItemIds.length > 0 ? (
                <>
                  <span>{`${selectedItemIds.length} item(s) selected`}</span>
                  <p>
                    {items
                      .filter((item) => selectedItemIds.includes(item.id))
                      .map((item) => item.name)
                      .join(", ")}
                  </p>
                </>
              ) : (
                "No items selected"
              )}
            </SelectedOptions>
          </>
        )}
      </div>

      {showModal && (
        <ModalSelection
          title={modalTitle}
          items={items}
          selectedItemIds={selectedItemIds}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
