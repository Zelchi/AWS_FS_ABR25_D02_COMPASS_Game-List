/ EditCategoryModal.tsx
mport { Dialog } from "@/components/ui/Dialog";
mport { CategoryForm } from "./CategoryForm";
ype Props = {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: (name: string) => void;
 defaultName: string;
;
xport function EditCategoryModal({ isOpen, onClose, onSubmit, defaultName }: Props) {
 return (
   <Dialog isOpen={isOpen} onClose={onClose} title="Edit Category">
     <CategoryForm onSubmit={onSubmit} onClose={onClose} defaultName={defaultName} />
   </Dialog>
 );
}
