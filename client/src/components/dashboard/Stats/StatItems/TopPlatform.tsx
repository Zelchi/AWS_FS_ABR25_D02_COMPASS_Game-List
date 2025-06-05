// noinspection SpellCheckingInspection

import defaultPlatformImage from "@/assets/imgs/default-platform.jpg";
import { StatsItem, PlatformImage } from "@/components/dashboard/Stats/styles";

export default function TopPlatform({ data }: { data: { name: string; imageUrl: string } }) {
  return (
    <StatsItem>
      {data ? (
        <>
          <PlatformImage
            src={data.imageUrl || defaultPlatformImage}
            fallback={defaultPlatformImage}
          />
          {data.name}aholic
        </>
      ) : (
        "No platforms? Not a player at all..."
      )}
    </StatsItem>
  );
}
