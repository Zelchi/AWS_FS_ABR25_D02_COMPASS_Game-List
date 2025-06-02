import SiteLayout from "@/components/global/SiteLayout";
import React, { useEffect } from "react";
import Table from "@/components/global/Table";
import SearchContainer from "@/components/global/SearchContainer";
import { useGlobal } from "@/contexts/globalContext";
import { usePlatform } from "@/contexts/platformContext";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";

export default function PlatformsContent() {
  const { platforms, page, limit, sortBy, sortOrder } = useGlobal();
  const { header, loadPlatforms } = usePlatform();

  useEffect(() => {
    loadPlatforms();
  }, [page, limit, sortBy, sortOrder]);

  return (
    <SiteLayout>
      <SearchContainer onLoadItems={loadPlatforms} />
      <Table<IPlatformEntity> data={platforms} header={header} />
    </SiteLayout>
  );
}
