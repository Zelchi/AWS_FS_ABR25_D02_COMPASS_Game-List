import React, { Dispatch } from "react";
import styled from "styled-components";
import TableItem from "@/components/global/TableItem";
import { EntityWithId } from "@/types/types";
import SortButton from "@/components/global/SortButton";
import RatingSummary from "@/components/global/RatingSummary";
import { useLocation } from "react-router-dom";

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

const TableRow = styled.tr`
  border-radius: 20px;

  td {
    background-color: var(--color-white);
    padding: 1.5rem 0;
    padding-right: 1.5rem;
    font-weight: 400;
    font-size: 1.4rem;
    font-family: var(--font-primary);

    &:first-child {
      border-radius: 0.8rem 0 0 0.8rem;
      padding-left: 1.5rem;
    }

    &:last-child {
      border-radius: 0 0.8rem 0.8rem 0;
    }
  }
`;

const GameImage = styled.span<{ $bgImage: string }>`
  display: block;
  width: 6.5rem;
  height: 5.5rem;
  background: ${({ $bgImage }) => `url(${$bgImage})`};
  background-size: cover;
  background-position: center;
  border-radius: 0.8rem;
`;

const PlatformImageContainer = styled.td`
  //height: 100%;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //gap: 0.5rem;
`;

const PlatformImage = styled.span<{ $bgImage: string }>`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  background: ${({ $bgImage }) => `url(${$bgImage})`};
  background-size: cover;
  background-position: center;
  border-radius: 100%;
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
  const location = useLocation().pathname;

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
      <thead>
        <tr>
          <th style={{ color: "white", textAlign: "left" }}>Image</th>
          <th style={{ color: "white", textAlign: "left" }}>Platform image</th>
          {header.map((head) => (
            <th key={head}>
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
          <th style={{ color: "white", textAlign: "left" }}>Buttons</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((item) => (
          <TableRow key={item.id}>
            {item.imageUrl ? (
              location === "/games" ? (
                <>
                  <td>
                    <GameImage $bgImage={(item as any)["imageUrl"]}></GameImage>
                  </td>
                  <PlatformImageContainer>
                    {(item as any).platforms?.map((platform: { id: string; imageUrl: string }) => (
                      <PlatformImage key={platform.id} $bgImage={platform.imageUrl ?? ""} />
                    ))}
                  </PlatformImageContainer>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {header.map((head) => (
              <TableItem<T> key={head} path={path} onItemsChange={onItemsChange} onClear={onClear}>
                {head === "rating" ? (
                  <RatingField>
                    <Rating
                      color={"var(--color-aqua)"}
                      bgColor={"var(--color-grey-light-05)"}
                      rating={(item as any)[head]}
                      maxRating={5}
                    />
                  </RatingField>
                ) : (item as any)[head] instanceof Date ? (
                  (item as any)[head].toLocaleDateString()
                ) : (
                  String((item as any)[head] ?? "")
                )}
              </TableItem>
            ))}
            <td>Buttons</td>
          </TableRow>
        ))}
      </tbody>
    </TableEL>
  );
}
