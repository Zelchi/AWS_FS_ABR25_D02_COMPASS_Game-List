import { useState, FormEvent } from "react";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";
import { FormField } from "./Fields/FormField";
import { useModal } from "@/contexts/modalContext";
import API from "@/utils/API";

export interface CategoryFormProps {
    initialData?: ICategoryEntity;
}

export default function CategoryForm({
    initialData,
}: CategoryFormProps) {
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [type] = useState(initialData ? "put" : "post");
    const { setIsModalOpen, setModalContent } = useModal();
    const [category, setCategory] = useState<Partial<ICategoryEntity>>({
        userId: "",
        name: initialData?.name || "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        const categoryData = {
            userId: category.userId,
            name: category.name,
        };

        try {
            const response = type === "post"
                ? await API.POST("/category", categoryData)
                : await API.PUT(`/category/${initialData?.id}`, categoryData);

            if (response && (response.status === 201 || response.status === 200)) {
                setIsModalOpen(false);
                setModalContent(null);
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                id="name"
                label="Category Name"
                value={category.name || ""}
                onChange={(e) => setCategory(prev => ({ ...prev, name: e.target.value }))}
            />

            {error && <p>{error}</p>}

            <div>
                <button type="button" onClick={handleCancel} disabled={submitting}> Cancel </button>
                <button type="submit" disabled={submitting}> {submitting ? "Saving..." : "Save"} </button>
            </div>
        </form>
    );
}