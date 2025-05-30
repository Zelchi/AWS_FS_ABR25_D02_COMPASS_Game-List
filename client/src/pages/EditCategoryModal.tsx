import { useState, useEffect } from "react";
import { Dialog } from "@/components/src/components/ui/Dialog";
import { DialogContent } from "@/components/src/components/ui/DialogContent";
import { DialogHeader } from "@/components/src/components/ui/DialogHeader";
import { DialogTitle } from "@/components/src/components/ui/DialogTitle";
import { Input } from "@/components/src/components/ui/Input";
import Button from "@/components/src/components/ui/Button";

type EditCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  defaultName: string;
};

export function EditCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  defaultName,
}: EditCategoryModalProps) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    setName(defaultName); // Reset field when modal opens with a different category
  }, [defaultName]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim());
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
