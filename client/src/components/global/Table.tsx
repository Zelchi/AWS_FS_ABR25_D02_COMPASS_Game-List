import React, { Dispatch, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import TableItem from "@/components/global/TableItem";
import { EntityWithId } from "@/types/types";
import SortButton from "@/components/global/SortButton";
import RatingSummary from "@/components/global/RatingSummary";
import { useLocation } from "react-router-dom";
import defaultImage from "@/assets/default-image.jpg";
import LastUpdate from "@/assets/last-update.svg?react";
import Edit from "@/assets/pen-outline.svg?react";
import Delete from "@/assets/trash-outline.svg?react";
import SafeImage from "@/components/global/SafeImage";
import MoreIcon from "@/components/global/MoreIcon";
import { useAddItem } from "@/contexts/AddItemContext";
import { addItem, deleteItem, getItem, updateItem } from "@/utils/crudHandlers";
import GameForm from "@/components/forms/GameForm";
import CategoryForm from "@/components/forms/CategoryForm";
import PlatformForm from "@/components/forms/PlatformForm";
import { useMediaQuery } from "react-responsive";

const getFormByPath = (path: string, onSubmit: (item: any) => void, item?: any) => {
  if (path.includes("games")) return <GameForm onSubmit={onSubmit} initialData={item} />;
  if (path.includes("categories")) return <CategoryForm onSubmit={onSubmit} initialData={item} />;
  if (path.includes("platforms")) return <PlatformForm onSubmit={onSubmit} initialData={item} />;
};

type TableProps<T extends EntityWithId> = {
  data: T[];
  header: string[];
  labels: { [key: string]: string };
  sortBy?: string;
  sortOrder: string;
  onSortByAndOrder: (e: React.MouseEvent<HTMLButtonElement>) => void;
  path: string;
  onItemsChange: Dispatch<React.SetStateAction<any[]>>;
  onClear?: () => void;
};

const TableEL = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.5rem;
`;

const TableRow = styled.tr<{ $location: string }>`
  cursor: pointer;
  border-radius: 20px;
  transition: var(--transition);

  &:hover,
  &:focus {
    transform: scale(1.02);
  }

  > td {
    background-color: var(--color-white);
    padding: 1.5rem 0;
    padding-right: 1.5rem;
    font-weight: 400;
    font-size: 1.4rem;
    font-family: var(--font-primary);

    @media (max-width: 30em) {
      padding: 1rem 0;
      padding-right: 1rem;
    }

    &:first-child {
      border-radius: ${({ $location }) => ($location === "/games" ? "0" : "0.8rem 0 0 0.8rem")};
      background-color: ${({ $location }) =>
        $location === "/games" ? "transparent" : "var(--color-white)"};
      padding-left: ${({ $location }) => ($location === "/games" ? "0" : "1.5rem")};
    }

    &:nth-child(2) {
      border-radius: ${({ $location }) => ($location === "/games" ? "0.8rem 0 0 0.8rem" : "0")};
      padding-left: ${({ $location }) => ($location === "/games" ? "1.5rem" : "0")};
    }

    &:last-child {
      border-radius: 0 0.8rem 0.8rem 0;

      span {
        display: flex;
        flex-wrap: nowrap;
        gap: 2.6rem;

        @media (max-width: 30em) {
          flex-direction: column;
          gap: 1rem;
        }

        button {
          cursor: pointer;
          border: none;
          background-color: transparent;
          width: 1.9rem;
          height: 1.9rem;
          fill: var(--color-aqua);
          transition: var(--transition);

          &:hover,
          &:focus {
            fill: var(--color-aqua-dark);
          }
        }
      }
    }

    @media (max-width: 67em) {
      &:first-child {
        border-radius: 0.8rem 0 0 0.8rem;
        background-color: var(--color-white);
        padding-left: 1.5rem;
      }

      &:nth-child(2) {
        border-radius: ${({ $location }) =>
          $location === "/categories" ? "0 0.8rem 0.8rem 0" : "0"};
        padding-left: 0;
      }
    }

      @media (max-width: 30em) {
          &:first-child {
              padding-left: 1rem;
          }
  }
`;

const GameImage = styled(SafeImage)`
  display: block;
  width: 6.5rem;
  height: 5.5rem;
  border-radius: 0.8rem;
`;

const PlatformImageContainer = styled.span`
  max-width: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PlatformImage = styled(SafeImage)`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const Rating = styled(RatingSummary)`
  display: inline-block;
  width: 2.2rem;
  height: 2.2rem;
`;

const RatingField = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TableEl = styled.td<{ $width: boolean }>`
  width: ${({ $width }) => ($width ? "100%" : "auto")};
`;

const LastUpdateIcon = styled(LastUpdate)`
  width: 1.7rem;
  height: 1.7rem;
  fill: var(--color-grey-03);
  transition: var(--transition);

  &:hover {
    fill: var(--color-aqua);
  }
`;

export default function Table<T extends EntityWithId>({
  data,
  header,
  labels,
  sortBy,
  sortOrder,
  onSortByAndOrder,
  path,
  onItemsChange,
  onClear,
}: TableProps<T>) {
  const isLaptop = useMediaQuery({ maxWidth: 67 * 16 });
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const { setAddItemHandler, setFormComponent } = useAddItem();
  const location = useLocation().pathname;
  const [mode, setMode] = useState<"add" | "edit">("add");

  const handleGet = useCallback(
    async (item: EntityWithId) => {
      if (!item.id) return;
      const data = await getItem<T>(item.id, path);
      if (data) {
        console.log(data);
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

  const openEditForm = useCallback(
    (item: T) => {
      setEditingItem(item);
      setFormComponent(getFormByPath(location, handleUpdate, item));
    },
    [handleUpdate, location, setFormComponent],
  );

  useEffect(() => {
    let form;
    if (mode === "add") {
      form = getFormByPath(location, handleAdd);
    } else {
      form = getFormByPath(location, handleUpdate, editingItem);
    }
    setFormComponent(form);

    setAddItemHandler(() => () => {
      if (mode === "add") {
        setFormComponent(getFormByPath(location, handleAdd));
      } else {
        setFormComponent(getFormByPath(location, handleUpdate, editingItem));
      }
    });

    return () => {
      setFormComponent(null);
      setAddItemHandler(null);
    };
  }, [location, mode, editingItem, handleAdd, handleUpdate, setFormComponent, setAddItemHandler]);

  const sorted = [...data].sort((a, b) => {
    function getValue<T>(item: T, key: keyof T): any {
      return item[key];
    }

    const aValue = getValue(a, sortBy as keyof T);
    const bValue = getValue(b, sortBy as keyof T);

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <TableEL>
      {isLaptop ? (
        ""
      ) : (
        <thead>
          <tr role="option">
            {location === "/games" && (
              <>
                {isLaptop ? (
                  ""
                ) : (
                  <th>
                    <SortButton
                      head={"updatedAt"}
                      onClick={onSortByAndOrder}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                    >
                      <LastUpdateIcon />
                    </SortButton>
                  </th>
                )}

                <th style={{ color: "white", textAlign: "left" }}></th>
                <th style={{ color: "white", textAlign: "left" }}></th>
              </>
            )}
            {header.map((head) => (
              <th key={head} style={{ paddingRight: "1.5rem" }}>
                <SortButton
                  head={head}
                  onClick={onSortByAndOrder}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                >
                  {labels[head]}
                </SortButton>
              </th>
            ))}
            <th style={{ color: "white", textAlign: "left" }}></th>
          </tr>
        </thead>
      )}

      <tbody>
        {sorted.map((item) => (
          <TableRow key={item.id} $location={location} role="option" tabIndex={0}>
            {"imageUrl" in item ? (
              location === "/games" ? (
                <>
                  {isLaptop ? "" : <td></td>}
                  <td style={{ width: "10rem" }}>
                    <GameImage
                      src={(item as any)["imageUrl"] || defaultImage}
                      fallback={defaultImage}
                    />
                  </td>
                  <td style={{ width: "7rem" }}>
                    <PlatformImageContainer>
                      {(item as any).platforms
                        ?.slice(0, 3)
                        .map((platform: { id: string; imageUrl: string }) => (
                          <PlatformImage key={platform.id} src={platform.imageUrl} />
                        ))}
                      {(item as any).platforms.length > 3 && <MoreIcon />}
                    </PlatformImageContainer>
                  </td>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {header.map((head) => (
              <TableEl key={head} $width={head === "title"}>
                <TableItem<T> path={path} onItemsChange={onItemsChange} onClear={onClear}>
                  {head === "rating" ? (
                    <RatingField>
                      <Rating
                        color={"var(--color-aqua)"}
                        bgColor={"var(--color-grey-light-05)"}
                        rating={(item as any)[head]}
                      />
                    </RatingField>
                  ) : head.includes("Date") || head.includes("At") ? (
                    new Date((item as any)[head]).toLocaleDateString()
                  ) : head === "price" ? (
                    `$${(item as any)[head] / 100}`
                  ) : (
                    String((item as any)[head] ?? "")
                  )}
                </TableItem>
              </TableEl>
            ))}
            <td style={{ width: "6.5rem" }}>
              <span>
                <button onClick={() => openEditForm(item)}>
                  <Edit />
                </button>
                <button onClick={() => handleGet(item)}>
                  <Delete />
                </button>
              </span>
            </td>
          </TableRow>
        ))}
      </tbody>
    </TableEL>
  );
}
