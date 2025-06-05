import { useState } from "react";
import { SelectionModal } from "./SelectionModal";
import { Form } from "@/components/forms/styles";
import Button from "@/components/button/Button";

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
  onConfirm,
}: SelectionFieldProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = (ids: string[]) => {
    onConfirm(ids);
    setShowModal(false);
  };

  return (
    <Form>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              {selectedItemIds.length > 0 ? (
                <>
                  <div>
                    {`${selectedItemIds.length} item(s) selected`}
                  </div>
                  <div>
                    {items
                      .filter(item => selectedItemIds.includes(item.id))
                      .map(item => item.name)
                      .join(", ")}
                  </div>
                </>
              ) : (
                "No items selected"
              )}
            </div>
            <Button type="button" onClick={() => setShowModal(true)}>
              {`Select ${label}`}
            </Button>
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
    </Form>
  );
}