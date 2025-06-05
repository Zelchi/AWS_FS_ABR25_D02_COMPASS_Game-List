import { useState, FormEvent } from "react";
import { IPlatformEntity } from "../../../../../server/src/Platform/PlatformEntity";
import { InputField } from "@/components/forms/Fields/InputField";
import { useModal } from "@/contexts/modalContext";
import API from "@/utils/API";
import { useGlobal } from "@/contexts/globalContext";

export interface PlatformFormProps {
  initialData?: IPlatformEntity;
}

export default function PlatformForm({ initialData }: PlatformFormProps) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [type] = useState(
    initialData && Object.keys(initialData).length > 0 ? "put" : "post"
  );
  const { setIsModalOpen, setModalContent } = useModal();
  const [platform, setPlatform] = useState<Partial<IPlatformEntity>>({
    userId: "",
    name: initialData?.name || "",
    company: initialData?.company || "",
    imageUrl: initialData?.imageUrl || "",
  });
  const { handleClear } = useGlobal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const platformData = {
      userId: platform.userId,
      name: platform.name,
      company: platform.company,
      imageUrl: platform.imageUrl,
    };

    try {
      const response =
        type === "post"
          ? await API.POST("/platform", platformData)
          : await API.PUT(`/platform/${initialData?.id}`, platformData);

      if (response && (response.status === 201 || response.status === 200)) {
        setIsModalOpen(false);
        setModalContent(null);
      }

      if (type === "post") handleClear();
    } catch (e) {
      setError("An error occurred while saving the platform. Please try again.");
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
        value={platform.name || ""}
        onChange={(e) => setPlatform((prev) => ({ ...prev, name: e.target.value }))}
      >
        Platform Name
      </InputField>

      <InputField
        name="company"
        value={platform.company || ""}
        onChange={(e) => setPlatform((prev) => ({ ...prev, company: e.target.value }))}
      >
        Company
      </InputField>

      <InputField
        name="imageUrl"
        type="url"
        value={platform.imageUrl || ""}
        onChange={(e) => setPlatform((prev) => ({ ...prev, imageUrl: e.target.value }))}
      >
        Image URL
      </InputField>

      {error && <p>{error}</p>}

      <div>
        <button type="button" onClick={handleCancel} disabled={submitting}>
          {" "}
          Cancel{" "}
        </button>
        <button type="submit" disabled={submitting}>
          {" "}
          {submitting ? "Saving..." : "Save"}{" "}
        </button>
      </div>
    </form>
  );
}
