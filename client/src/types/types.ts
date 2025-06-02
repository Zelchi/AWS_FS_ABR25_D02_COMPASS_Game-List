export type EntityWithId = {
  id?: string;
  imageUrl?: string;
  platforms?: { id: string }[] | undefined;
};

export type SortOrder = "asc" | "desc";
