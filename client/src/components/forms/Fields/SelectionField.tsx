import { useState } from "react";
import { SelectionModal } from "./SelectionModal";

export interface SelectionFieldProps {
  label: string;
  modalTitle: string;
  items: { id: string; name: string }[];
  selectedItemIds: string[];
  loading: boolean;
  onConfirm: (selectedIds: string[]) => void;
}

export function SelectionField({
  label,
  modalTitle,
  items,
  selectedItemIds,
  loading,
  onConfirm
}: SelectionFieldProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = (ids: string[]) => {
    onConfirm(ids);
    setShowModal(false);
  };

  return (
    <form>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              {selectedItemIds.length > 0
                ? `${selectedItemIds.length} item(s) selected`
                : "No items selected"}
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
            >
              {`Select ${label}`}
            </button>
          </>
        )}
      </div>

      {showModal && (
        <SelectionModal
          title={modalTitle}
          items={items}
          selectedItemIds={selectedItemIds}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </form>
  );
}