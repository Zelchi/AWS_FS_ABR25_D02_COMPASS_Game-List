import React from "react";
import { useLocation } from "react-router-dom";
import LastUpdateIcon from "@/assets/icons/last-update.svg?react";
import SortButton from "@/components/data/sort/SortButton";
import { HeaderStyledIcon, THCell } from "@/components/table/styles";
import { getLabel, isLabelKey } from "@/utils/labels";

export default function TableHead({ header }: { header: string[] }) {
  const location = useLocation().pathname;

  return (
    <thead>
      <tr role="option">
        {location === "/games" && (
          <THCell colSpan={3}>
            <SortButton head={"updatedAt"}>
              <HeaderStyledIcon icon={LastUpdateIcon} />
            </SortButton>
          </THCell>
        )}
        {header.map((head) => (
          <THCell key={head} $head={head}>
            <SortButton head={head}>{isLabelKey(head) ? getLabel(head) : ""}</SortButton>
          </THCell>
        ))}
        <THCell></THCell>
      </tr>
    </thead>
  );
}
