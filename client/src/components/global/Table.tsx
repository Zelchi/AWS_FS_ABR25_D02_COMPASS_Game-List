import React, { Dispatch } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SortButton from "@/components/global/SortButton";
import RatingSummary from "@/components/global/RatingSummary";
import SafeImage from "@/components/global/SafeImage";
import MoreIcon from "@/components/global/MoreIcon";
import defaultImage from "@/assets/default-image.jpg";
import LastUpdate from "@/assets/last-update.svg?react";
import Edit from "@/assets/pen-outline.svg?react";
import Delete from "@/assets/trash-outline.svg?react";
import { sortItems } from "@/utils/sortItems";
import { useGlobal } from "@/contexts/globalContext";
import { getLabel, isLabelKey } from "@/utils/labels";

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
          flex-direction: ${({ $location }) => ($location === "/games" ? "column" : "row")};
          justify-content: ${({ $location }) => ($location === "/games" ? "center" : "flex-end")};
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

const TableItem = styled.span`
  color: var(--color-black);
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

type TableProps<T> = {
  data: T[];
  header: string[];
};

export default function Table<T extends Record<string, any>>({ data, header }: TableProps<T>) {
  const { sortBy, sortOrder } = useGlobal();
  const isLaptop = useMediaQuery({ maxWidth: 67 * 16 });
  const location = useLocation().pathname;
  const sorted = [...data].sort(sortItems<T>(sortBy, sortOrder));

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
                    <SortButton head={"updatedAt"}>
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
                <SortButton head={head}>{isLabelKey(head) ? getLabel(head) : ""}</SortButton>
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
                <TableItem>
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
                <button>
                  <Edit />
                </button>
                <button>
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
