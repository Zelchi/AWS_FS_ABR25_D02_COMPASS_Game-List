import { useState, FormEvent } from "react";
import { IPlatformEntity } from "../../../../../server/src/routes/Platform/PlatformEntity";
import { InputField } from "@/components/forms/Fields/InputField";
import React, { useState, FormEvent } from "react";
import { IPlatformEntity } from "../../../../../server/src/Platform/PlatformEntity";

import { useModal } from "@/contexts/modalContext";
import API from "@/utils/API";
import { useGlobal } from "@/contexts/globalContext";
import { toast } from "react-toastify";
import { ButtonSet, Form, FormField, StyledInput, StyledLabel } from "@/components/forms/styles";
import { InvalidMessage } from "@/components/forms/LoginForm/styles";
import Button from "@/components/button/Button";

export interface PlatformFormProps {
  initialData?: IPlatformEntity;
}

export default function PlatformForm({ initialData }: PlatformFormProps) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [type] = useState(initialData && Object.keys(initialData).length > 0 ? "put" : "post");
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
        response.status === 200 && toast.success("Platform updated successfully!");
        response.status === 201 && toast.success("Platform created successfully!");
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
    <Form onSubmit={handleSubmit}>
      <FormField>
        <StyledLabel htmlFor="name">Platform Name</StyledLabel>
        <StyledInput
          name="name"
          value={platform.name || ""}
          onChange={(e) => setPlatform((prev) => ({ ...prev, name: e.target.value }))}
        />
      </FormField>

      <FormField>
        <StyledLabel htmlFor="company">Company</StyledLabel>
        <StyledInput
          name="company"
          value={platform.company || ""}
          onChange={(e) => setPlatform((prev) => ({ ...prev, company: e.target.value }))}
        />
      </FormField>

      <FormField>
        <StyledLabel htmlFor="imageUrl">Image URL</StyledLabel>
        <StyledInput
          name="imageUrl"
          type="url"
          value={platform.imageUrl || ""}
          onChange={(e) => setPlatform((prev) => ({ ...prev, imageUrl: e.target.value }))}
        />
      </FormField>

      {error && <InvalidMessage>{error}</InvalidMessage>}

      <ButtonSet>
        <Button
          type="button"
          variant="danger"
          size="large"
          onClick={handleCancel}
          disabled={submitting}
        >
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
