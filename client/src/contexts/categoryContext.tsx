import React, { createContext, ReactNode, useContext } from "react";
import { ICategoryEntity } from "@/../../server/src/Category/CategoryEntity";
import { fetchAndSetData } from "@/utils/fetchAndSetData";
import { useGlobal } from "@/contexts/globalContext";

type CategoryContextType = {
  header: string[];
  loadCategories: () => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { setCategories, page, sortOrder, search, limit } = useGlobal();

  const header = ["name"];
  const pathAPI =
    `category/page?page=${page}&limit=${limit}` + `&sortBy=name&sortOrder=${sortOrder}`;

  const loadCategories = async () => {
    await fetchAndSetData<ICategoryEntity[]>({
      path: pathAPI,
      search,
      setData: setCategories,
      extractData: (res) => res?.categories,
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        header,
        loadCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used inside a CategoryProvider");
  }
  return context;
};
