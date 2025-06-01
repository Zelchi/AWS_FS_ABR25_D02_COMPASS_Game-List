import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { addItem, deleteItem, getItem, updateItem } from "@/utils/crudHandlers";
import GameForm from "@/components/forms/GameForm";
import CategoryForm from "@/components/forms/CategoryForm";
import PlatformForm from "@/components/forms/PlatformForm";
import { useAddItem } from "@/contexts/AddItemContext";
import { useLocation } from "react-router-dom";
import { EntityWithId } from "@/types/types";

type TableItemProps<T extends EntityWithId> = {
  children: React.ReactNode;
  path: string;
  onClear?: () => void;
  onItemsChange: (items: T[]) => void;
};

const Cell = styled.span`
  color: var(--color-black);
`;

export default function TableItem<T extends EntityWithId>({
  children,
  path,
  onItemsChange,
  onClear,
}: TableItemProps<T>) {
  return <Cell>{children}</Cell>;
}
