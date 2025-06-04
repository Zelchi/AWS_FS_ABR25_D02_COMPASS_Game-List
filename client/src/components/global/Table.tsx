import React, { Dispatch, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SortButton from "@/components/global/SortButton";
import RatingSummary from "@/components/global/RatingSummary";
import SmartImage from "@/components/global/SmartImage";
import defaultImage from "@/assets/default-image.jpg";
import LastUpdate from "@/assets/last-update.svg?react";
import Edit from "@/assets/pen-outline.svg?react";
import Delete from "@/assets/trash-outline.svg?react";
import { sortItems } from "@/utils/sortItems";
import { useGlobal } from "@/contexts/globalContext";
import { getLabel, isLabelKey } from "@/utils/labels";
import PlatformImages from "@/components/global/PlatformImages";
import { useModal } from "@/contexts/modalContext";
import { getItem } from "@/utils/crudHandlers";

const tableTransitionDuration = 600;

const TableEL = styled.table<{ $isAnimating: boolean }>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.5rem;

  tbody {
    opacity: ${({ $isAnimating }) => ($isAnimating ? "0.5" : "1")};
    filter: ${({ $isAnimating }) => ($isAnimating ? "blur(.4rem)" : "blur(0)")};
    transition:
      filter ${tableTransitionDuration / 1000}s ease,
      opacity ${tableTransitionDuration / 1000}s ease;
  }
`;

const TableRow = styled.tr<{ $location: string }>`
    cursor: pointer;
    border-radius: 20px;
    transition: var(--transition);

  &:hover,
  &:focus {
      box-shadow: 0 0.2rem 1.2rem var(--color-aqua);
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
      border-radius: 0.8rem 0 0 0.8rem;      
      padding-left: 1.5rem;
    }

        &:last-child {
            border-radius: 0 0.8rem 0.8rem 0;

            span {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: flex-end;
                    gap: 2.6rem;

                    @media (max-width: 30em) {
                        flex-direction: ${({ $location }) => ($location === "/games" ? "column" : "row")};
                        justify-content: ${({ $location }) => ($location === "/games" ? "center" : "flex-end")};
                        align-items: ${({ $location }) => ($location === "/games" ? "flex-end" : "center")};
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
    }

            @media (max-width: 30em) {
            &:first-child {
                    padding-left: 1rem;
                }
            }
        }
`;

const TableItem = styled.span`
  color: var(--color-black);
`;

const GameImage = styled(SmartImage)`
  display: block;
  width: 6.5rem;
  height: 5.5rem;
  border-radius: 0.8rem;
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

const dicionary = {
    games: "game",
    categories: "category",
    platforms: "platform",
}

export default function Table<T extends Record<string, any>>({ data, header }: TableProps<T>) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [visibleData, setVisibleData] = useState(data);
    const { sortBy, sortOrder, isLaptop, games, categories, platforms } = useGlobal();
    const location = useLocation().pathname;
    const sorted = [...visibleData].sort(sortItems<T>(sortBy, sortOrder));
    const { handleModalContent } = useModal();
    const maxSizeText = 30;

    const handleEdit = async (item) => {
        const response = await getItem(item && item.id, 'game')
        handleModalContent(location, response);
    }
    
    useEffect(() => {
        setIsAnimating(true);
        const timeout = setTimeout(() => {
            setIsAnimating(false);
        }, tableTransitionDuration);

        return () => clearTimeout(timeout);
    }, [games, categories, platforms]);

    useEffect(() => {
        setIsAnimating(true);

        const timeout = setTimeout(() => {
            setIsAnimating(false);
            setVisibleData(data);
        }, tableTransitionDuration);

        return () => clearTimeout(timeout);
    }, [data]);

    return (
        <TableEL $isAnimating={isAnimating}>
            {isLaptop ? (
                ""
            ) : (
                <thead>
                    <tr role="option">
                        {location === "/games" && (
                            <>
                                <th>
                                    <SortButton head={"updatedAt"}>
                                        <LastUpdateIcon />
                                    </SortButton>
                                </th>
                                <th style={{ color: "white", textAlign: "left" }}></th>
                                <th style={{ color: "white", textAlign: "left" }}></th>
                            </>
                        )}
                        {header.map((head) =>
                            head === "name" ? (
                                <th key={head} style={{ paddingRight: "1.5rem", width: "30%" }}>
                                    <SortButton head={head}>{isLabelKey(head) ? getLabel(head) : ""}</SortButton>
                                </th>
                            ) : (
                                <th key={head} style={{ paddingRight: "1.5rem" }}>
                                    <SortButton head={head}>{isLabelKey(head) ? getLabel(head) : ""}</SortButton>
                                </th>
                            ),
                        )}
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
                                    <td colSpan={2} style={{ width: "8%" }}>
                                        <GameImage
                                            src={(item as any)["imageUrl"] || defaultImage}
                                            fallback={defaultImage}
                                        />
                                    </td>
                                    <td style={{ width: "7rem" }}>
                                        <PlatformImages game={item as any} />
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
                                    {head === "name" ? (
                                        (item as any)[head].length > maxSizeText ? (
                                            (item as any)[head].slice(0, maxSizeText).trim() + "..."
                                        ) : (
                                            (item as any)[head]
                                        )
                                    ) : head === "rating" ? (
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
                        <td style={{ width: "6.5rem", marginLeft: "auto" }}>
                            <span>
                                <button onClick={() => handleEdit(item)}>
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
