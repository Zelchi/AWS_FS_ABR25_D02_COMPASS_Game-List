// AddCategoryModal.tsx
import { Dialog } from "@/components/ui/Dialog";
import { CategoryForm } from "./CategoryForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export function AddCategoryModal({ isOpen, onClose, onSubmit }: Props) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add Category">
      <CategoryForm onSubmit={onSubmit} onClose={onClose} />
    </Dialog>
  );
}
