import React, { createContext, ReactNode, useContext } from "react";
import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";
import { fetchAndSetData } from "@/utils/fetchAndSetData";
import { useGlobal } from "@/contexts/globalContext";

type PlatformContextType = {
  header: string[];
  loadPlatforms: () => Promise<void>;
};

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
  const { setPlatforms, page, sortBy, sortOrder, search, limit } = useGlobal();

  const header = ["name", "company"];
  const pathAPI =
    `platform/page?page=${page}&limit=${limit}` + `&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const loadPlatforms = async () => {
    await fetchAndSetData<IPlatformEntity[]>({
      path: pathAPI,
      search,
      setData: setPlatforms,
      extractData: (res) => res?.platforms,
    });
  };

  return (
    <PlatformContext.Provider
      value={{
        header,
        loadPlatforms,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used inside a PlatformProvider");
  }
  return context;
};
