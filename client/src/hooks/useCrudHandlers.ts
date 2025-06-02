import { useCallback } from "react";
import { addItem, deleteItem, getItem, updateItem } from "@/utils/crudHandlers";
import { EntityWithId } from "@/types/types";

type UseCrudHandlersProps<T> = {
  path: string;
  onItemsChange: (items: any[]) => void;
  onClear?: () => void;
};

export function useCrudHandlers<T extends object>({
  path,
  onItemsChange,
  onClear,
}: UseCrudHandlersProps<T>) {
  const handleGet = useCallback(
    async (item: EntityWithId) => {
      if (!item.id) return;
      const data = await getItem<T>(item.id, path);
      if (data) {
        onItemsChange([data]);
      }
    },
    [onItemsChange, path],
  );

  const handleAdd = useCallback(
    async (item: T) => {
      const data = await addItem<T>(item, path);
      if (data) {
        onItemsChange(data);
        onClear?.();
      }
    },
    [onItemsChange, onClear, path],
  );

  const handleUpdate = useCallback(
    async (item: T) => {
      const data = await updateItem<T>(item, path);
      if (data) {
        onItemsChange(data);
      }
    },
    [onItemsChange, path],
  );

  const handleDelete = useCallback(
    async (item: EntityWithId) => {
      if (!item.id) return;
      const data = await deleteItem<T>(item.id, path);
      if (data) {
        onItemsChange(data);
      }
    },
    [onItemsChange, path],
  );

  return {
    handleGet,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}
