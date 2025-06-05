import HouseIcon from "@/assets/icons/house-outline.svg?react";
import ControllerIcon from "@/assets/icons/controller.svg?react";
import TagIcon from "@/assets/icons/tag.svg?react";
import ChipIcon from "@/assets/icons/chip.svg?react";
import SignOutIcon from "@/assets/icons/sign-out-outline.svg?react";

export const routes = [
  {
    path: "/",
    label: "Home",
    singular: "",
    icon: HouseIcon,
  },
  {
    path: "/Games",
    label: "Games",
    singular: "game",
    icon: ControllerIcon,
  },
  {
    path: "/Categories",
    label: "Categories",
    singular: "category",
    icon: TagIcon,
  },
  {
    path: "/Platforms",
    label: "Platforms",
    singular: "platform",
    icon: ChipIcon,
  },
  {
    path: "/Login",
    label: "Logout",
    singular: "",
    icon: SignOutIcon,
  },
];
