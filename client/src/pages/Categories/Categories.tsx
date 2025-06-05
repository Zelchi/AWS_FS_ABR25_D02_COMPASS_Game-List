import { CategoryProvider } from "@/contexts/categoryContext";
import CategoriesContent from "@/pages/Categories/CategoriesContent";

export default function Categories() {
  return (
    <CategoryProvider>
      <CategoriesContent />
    </CategoryProvider>
  );
}
