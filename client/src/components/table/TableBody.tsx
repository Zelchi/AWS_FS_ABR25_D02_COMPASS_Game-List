import React from "react";
import { useLocation } from "react-router-dom";
import EditIcon from "@/assets/icons/pen-outline.svg?react";
import DeleteIcon from "@/assets/icons/trash-outline.svg?react";
import TableImages from "@/components/table/TableImages";
import ColumnMap from "@/components/table/columns/ColumnMap";
import ColumnName from "@/components/table/columns/ColumnName";
import ColumnRating from "@/components/table/columns/ColumnRating";
import ColumnDates from "@/components/table/columns/ColumnDates";
import ColumnPrice from "@/components/table/columns/ColumnPrice";
import { BodyStyledIcon, ButtonSet, TBCell, TBody, TBRow } from "@/components/table/styles";

type TableProps = {
  data: any;
  header: string[];
  isAnimating: boolean;
  transitionDuration: number;
};

export default function TableBody({ data, header, isAnimating, transitionDuration }: TableProps) {
  const location = useLocation().pathname;

  return (
    <TBody $isAnimating={isAnimating} $transitionDuration={transitionDuration}>
      {data.map((item: { id: string; [key: string]: any }) => (
        <TBRow key={item.id} $location={location} role="option" tabIndex={0}>
          {location === "/Games" && <TableImages item={item} />}
          {header.map((head) => (
            <TBCell key={head} $width={head === "title"}>
              <ColumnMap
                head={head}
                name={<ColumnName item={item} head={head} />}
                rating={<ColumnRating item={item} head={head} />}
                dates={<ColumnDates item={item} head={head} />}
                price={<ColumnPrice item={item} head={head} />}
                fallback={String(item[head] ?? "")}
              />
            </TBCell>
          ))}
          <ButtonSet $location={location}>
            <span>
              <BodyStyledIcon icon={EditIcon} role="button" onClick={() => {}} />
              <BodyStyledIcon icon={DeleteIcon} role="button" onClick={() => {}} />
            </span>
          </ButtonSet>
        </TBRow>
      ))}
    </TBody>
  );
}
