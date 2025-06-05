import React from "react";

type ResponsiveLayoutProps = {
  head: string;
  name?: React.ReactNode;
  rating?: React.ReactNode;
  dates?: React.ReactNode;
  price?: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function ColumnMap({
  head,
  name,
  dates,
  price,
  rating,
  fallback = null,
}: ResponsiveLayoutProps) {
  if (head === "name") return <>{name}</>;
  if (head === "rating") return <>{rating}</>;
  if (head.includes("Date") || head.includes("At")) return <>{dates}</>;
  if (head === "price") return <>{price}</>;
  return <>{fallback}</>;
}
