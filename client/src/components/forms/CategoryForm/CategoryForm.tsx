import { useState, FormEvent } from "react";
import { ICategoryEntity } from "../../../../../server/src/routes/Category/CategoryEntity";
import { InputField } from "@/components/forms/Fields/InputField";
import { useModal } from "@/contexts/modalContext";
import API from "@/utils/API";
import { useGlobal } from "@/contexts/globalContext";
import Button from "@/components/button/Button";

export interface CategoryFormProps {
  initialData?: ICategoryEntity;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [type] = useState(
      initialData && Object.keys(initialData).length > 0 ? "put" : "post"
    );
  const { setIsModalOpen, setModalContent } = useModal();
  const [category, setCategory] = useState<Partial<ICategoryEntity>>({
    userId: "",
    name: initialData?.name || "",
  });
  const { handleClear } = useGlobal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const categoryData = {
      userId: category.userId,
      name: category.name,
    };

    try {
      const response =
        type === "post"
          ? await API.POST("/category", categoryData)
          : await API.PUT(`/category/${initialData?.id}`, categoryData);

      if (response && (response.status === 201 || response.status === 200)) {
        setIsModalOpen(false);
        setModalContent(null);
        if (type === "post") handleClear();
      }
    } catch (e) {
      setError("An error occurred while saving the category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="name"
        value={category.name || ""}
        onChange={(e) => setCategory((prev) => ({ ...prev, name: e.target.value }))}
      >
        Category Name
      </InputField>

      {error && <p>{error}</p>}

      <div>
        <Button type="button" onClick={handleCancel} disabled={submitting}>
          {" "}
          Cancel{" "}
        </Button>
        <Button type="submit" disabled={submitting}>
          {" "}
          {submitting ? "Saving..." : "Save"}{" "}
        </Button>
      </div>
    </form>
  );
}
