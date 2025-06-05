import React, { useEffect } from "react";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";
import SearchContainer from "@/components/data/search/SearchContainer";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import Table from "@/components/table/Table";
import { useCategory } from "@/contexts/categoryContext";
import { useGlobal } from "@/contexts/globalContext";

export default function CategoriesContent() {
  const { categories, page, limit, sortOrder } = useGlobal();
  const { header, loadCategories } = useCategory();

  useEffect(() => {
    loadCategories();
  }, [page, limit, sortOrder]);

  return (
    <SiteLayout>
      <SearchContainer onLoadItems={loadCategories} />
      <Table<ICategoryEntity> data={categories} header={header} />
    </SiteLayout>
  );
}
