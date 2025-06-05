import React, { useEffect } from "react";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";
import { useGlobal } from "@/contexts/globalContext";
import { usePlatform } from "@/contexts/platformContext";
import SearchContainer from "@/components/data/search/SearchContainer";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import Table from "@/components/table/Table";

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
