import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";

export default function CategoryForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: ICategoryEntity) => void;
  initialData?: ICategoryEntity;
}) {
  return <form>Category Form</form>;
}
