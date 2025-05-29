import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryForm } from "./CategoryForm";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  defaultName: string;
}

export function EditCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  defaultName,
}: EditCategoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <CategoryForm defaultName={defaultName} onSubmit={onSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
