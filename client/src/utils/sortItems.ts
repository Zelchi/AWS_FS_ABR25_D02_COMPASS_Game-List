import { SortOrder } from "@/types/types";

export const sortItems = <T extends Record<string, any>>(sortBy: keyof T, sortOrder: SortOrder) => {
  return (a: T, b: T) => {
    const aValue: unknown = a[sortBy];
    const bValue: unknown = b[sortBy];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const isDate = (val: unknown): val is Date => val instanceof Date;
    const isString = (val: unknown): val is string => typeof val === "string";
    const isNumber = (val: unknown): val is number => typeof val === "number";

    if (isDate(aValue) && isDate(bValue)) {
      return sortOrder === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    if (isString(aValue) && isString(bValue)) {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (isNumber(aValue) && isNumber(bValue)) {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  };
};
