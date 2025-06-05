import { GameImage } from "@/components/table/styles";
import defaultImage from "@/assets/imgs/default-image.jpg";
import PlatformImages from "@/components/image/PlatformImages/PlatformImages";
import React from "react";

export default function TableImages({ item }: { item: any }) {
  return (
    <>
      <td colSpan={2} style={{ width: "8%" }}>
        <GameImage src={item["imageUrl"] || defaultImage} fallback={defaultImage} />
      </td>
      <td style={{ width: "7rem" }}>
        <PlatformImages game={item} />
      </td>
    </>
  );
}
