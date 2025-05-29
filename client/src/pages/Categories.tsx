import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddCategoryModal } from "./AddCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";

type Category = {
  id: number;
  name: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "RPG" },
    { id: 2, name: "Ação" },
    { id: 3, name: "Aventura" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = (name: string) => {
    const newCategory = {
      id: Date.now(), // Em um app real, o backend retorna o ID
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (name: string) => {
    if (!selectedCategory) return;
    setCategories((prev) =>
      prev.map((cat) => (cat.id === selectedCategory.id ? { ...cat, name } : cat))
    );
  };

  const handleDeleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Categorias</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>+ Nova Categoria</Button>
      </div>

      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2"
          >
            <span>{category.name}</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsEditModalOpen(true);
                }}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modais */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCategory}
      />
      {selectedCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setSelectedCategory(null);
            setIsEditModalOpen(false);
          }}
          onSubmit={handleEditCategory}
          defaultName={selectedCategory.name}
        />
      )}
    </div>
  );
}
