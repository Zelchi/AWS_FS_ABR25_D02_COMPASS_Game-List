import { useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "RPG" },
    { id: 2, name: "Action" },
    { id: 3, name: "Adventure" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = (name: string) => {
    const newCategory = { id: Date.now(), name };
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
    <Container>
      <Header>
        <Title>Categories</Title>
        <StyledButton onClick={() => setIsAddModalOpen(true)}>+ New Category</StyledButton>
      </Header>

      <CategoryList>
        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryName>{category.name}</CategoryName>
            <ButtonGroup>
              <StyledButton
                onClick={() => {
                  setSelectedCategory(category);
                  setIsEditModalOpen(true);
                }}
              >
                Edit
              </StyledButton>
              <StyledButton onClick={() => handleDeleteCategory(category.id)} danger>
                Delete
              </StyledButton>
            </ButtonGroup>
          </CategoryItem>
        ))}
      </CategoryList>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCategory}
      />

      {selectedCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleEditCategory}
          defaultName={selectedCategory.name}
        />
      )}
    </Container>
  );
}
