const labels = {
  name: "Name",
  company: "Company",
  description: "Description",
  imageUrl: "Image",
  status: "Status",
  favorite: "Favorite",
  rating: "Rating",
  acquisDate: "Acquisition Date",
  finishDate: "Finished Date",
  price: "Price",
  categories: "Categories",
  platforms: "Platforms",
  updatedAt: "Last Update",
};

export const getLabel = <T extends keyof typeof labels>(key: T) => labels[key];

export const isLabelKey = (key: string): key is keyof typeof labels => key in labels;
