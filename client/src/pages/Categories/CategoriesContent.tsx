import SiteLayout from "@/components/global/SiteLayout";
import React, { useEffect } from "react";
import Table from "@/components/global/Table";
import SearchContainer from "@/components/global/SearchContainer";
import { useGlobal } from "@/contexts/globalContext";
import { useCategory } from "@/contexts/categoryContext";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";

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
      {/*Pagination*/}
    </SiteLayout>
  );
}
