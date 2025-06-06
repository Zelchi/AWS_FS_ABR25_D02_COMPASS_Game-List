import React, { useState, FormEvent } from "react";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";
import { useModal } from "@/contexts/modalContext";
import API from "@/utils/API";
import { useGlobal } from "@/contexts/globalContext";
import Button from "@/components/button/Button";
import { ButtonSet, Form, FormField, StyledInput, StyledLabel } from "@/components/forms/styles";
import { InvalidMessage } from "@/components/forms/LoginForm/styles";
import { toast } from "react-toastify";

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
        response.status === 200 && toast.success("Category updated successfully!");
        response.status === 201 && toast.success("Category created successfully!");
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
    <Form onSubmit={handleSubmit}>
      <FormField>
        <StyledLabel htmlFor="name">Category Name</StyledLabel>
        <StyledInput
          name="name"
          value={category.name || ""}
          onChange={(e) => setCategory((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </FormField>

      {error && <p>{error}</p>}

      <ButtonSet>
        <Button type="button" onClick={handleCancel} disabled={submitting}>
          {" "}
          Cancel{" "}
        </Button>
        <Button type="submit" size="large" disabled={submitting}>
          {" "}
          {submitting ? "Saving..." : "Save"}{" "}
        </Button>
      </ButtonSet>
    </Form>
  );
}
