import React from "react";

export type FilterBarProps = {
  header?: string[];
  onLoadItems?: () => Promise<void>;
  data: {
    id: string;
    name: string;
  }[];
  favoriteIcon: React.JSX.Element;
};

export const filterDictionary: Record<string, string> = {
  categoryBy: "Category",
  platformBy: "Platform",
  statusBy: "Status",
};
