import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { addItem, deleteItem, getItem, updateItem } from "@/utils/crudHandlers";
import GameForm from "@/components/forms/GameForm";
import CategoryForm from "@/components/forms/CategoryForm";
import PlatformForm from "@/components/forms/PlatformForm";
import { useAddItem } from "@/contexts/AddItemContext";
import { useLocation } from "react-router-dom";
import { EntityWithId } from "@/types/types";

const getFormByPath = (path: string, onSubmit: (item: any) => void) => {
  if (path.includes("games")) return <GameForm onSubmit={onSubmit} />;
  if (path.includes("categories")) return <CategoryForm onSubmit={onSubmit} />;
  if (path.includes("platforms")) return <PlatformForm onSubmit={onSubmit} />;
};

type TableItemProps<T extends EntityWithId> = {
  children: React.ReactNode;
  path: string;
  onClear?: () => void;
  onItemsChange: (items: T[]) => void;
};

const Cell = styled.td`
  color: var(--color-black);
`;

export default function TableItem<T extends EntityWithId>({
  children,
  path,
  onItemsChange,
  onClear,
}: TableItemProps<T>) {
  const { setAddItemHandler, setFormComponent } = useAddItem();
  const location = useLocation().pathname;

  const handleGet = useCallback(
    async (item: EntityWithId) => {
      if (!item.id) return;
      const data = await getItem<T>(item.id, path);
      if (data) {
        onItemsChange([data]);
      }
    },
    [onItemsChange],
  );

  const handleAdd = useCallback(
    async (item: T) => {
      const data = await addItem<T>(item, path);
      if (data) {
        onItemsChange(data);
        onClear?.();
        setFormComponent(null);
      }
    },
    [onItemsChange, onClear, setFormComponent, path],
  );

  const handleUpdate = useCallback(
    async (item: T) => {
      const data = await updateItem<T>(item, path);
      if (data) {
        onItemsChange(data);
        setFormComponent(null);
      }
    },
    [onItemsChange, setFormComponent],
  );

  const handleDelete = useCallback(
    async (item: EntityWithId) => {
      if (!item.id) return;
      const data = await deleteItem<T>(item.id, path);
      if (data) {
        onItemsChange(data);
      }
    },
    [onItemsChange],
  );

  useEffect(() => {
    const form = getFormByPath(location, handleAdd);
    setFormComponent(form);

    setAddItemHandler(() => () => {
      setFormComponent(getFormByPath(location, handleAdd));
    });

    return () => {
      setFormComponent(null);
      setAddItemHandler(null);
    };
  }, [handleAdd, location]);

  useEffect(() => {
    const form = getFormByPath(location, handleUpdate);
    setFormComponent(form);

    setAddItemHandler(() => () => {
      setFormComponent(getFormByPath(location, handleUpdate));
    });

    return () => {
      setFormComponent(null);
      setAddItemHandler(null);
    };
  }, [handleUpdate, location]);

  return <Cell>{children}</Cell>;
}
