import { CategoryProvider } from "@/contexts/categoryContext";
import CategoriesContent from "@/components/content/CategoriesContent";

export default function Categories() {
  return (
    <CategoryProvider>
      <CategoriesContent />
    </CategoryProvider>
  );
}
