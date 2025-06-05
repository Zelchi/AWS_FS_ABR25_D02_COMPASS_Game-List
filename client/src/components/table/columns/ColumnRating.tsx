import { Rating } from "@/components/table/styles";
import React from "react";

export default function ColumnRating({ item, head }: { item: any; head: string }) {
  return <Rating rating={item[head]} />;
}
