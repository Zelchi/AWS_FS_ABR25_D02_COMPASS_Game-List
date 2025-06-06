import React, { useEffect } from "react";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";
import SearchContainer from "@/components/data/search/SearchContainer";
import SiteLayout from "@/components/layout/SiteLayout/SiteLayout";
import Table from "@/components/table/Table";
import { useGlobal } from "@/contexts/globalContext";
import { PaginationButtons } from "@/components/table/TablePagination";

export default function CategoriesContent() {
  const { categories, page, limit, sortOrder, cleared, loadCategories } = useGlobal();
  const header = ["name"];

  useEffect(() => {
    void loadCategories();
  }, [page, limit, sortOrder, cleared]);

  return (
    <SiteLayout>
      <SearchContainer />
      <Table<ICategoryEntity> data={categories} header={header} />
      <PaginationButtons />
    </SiteLayout>
  );
}
