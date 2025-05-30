import { useState } from "react";
import { Dialog } from "@/components/src/components/ui/Dialog";
import { DialogContent } from "@/components/src/components/ui/DialogContent";
import { DialogHeader } from "@/components/src/components/ui/DialogHeader";
import { DialogTitle } from "@/components/src/components/ui/DialogTitle";
import Button from "@/components/src/components/ui/Button";
import { Input } from "@/components/src/components/ui/Input";

type AddCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export function AddCategoryModal({ isOpen, onClose, onSubmit }: AddCategoryModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
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
            <Button onClick={handleSubmit}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
