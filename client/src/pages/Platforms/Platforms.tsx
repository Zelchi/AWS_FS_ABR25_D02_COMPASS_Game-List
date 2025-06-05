import React, { useEffect } from "react";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";
import { useGlobal } from "@/contexts/globalContext";
import SearchContainer from "@/components/data/search/SearchContainer";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import Table from "@/components/table/Table";

export default function PlatformsContent() {
  const { platforms, page, limit, sortBy, sortOrder, loadPlatforms } = useGlobal();
  const header = ["name", "company"];

  useEffect(() => {
    void loadPlatforms();
  }, [page, limit, sortBy, sortOrder]);

  return (
    <SiteLayout>
      <SearchContainer />
      <Table<IPlatformEntity> data={platforms} header={header} />
    </SiteLayout>
  );
}
