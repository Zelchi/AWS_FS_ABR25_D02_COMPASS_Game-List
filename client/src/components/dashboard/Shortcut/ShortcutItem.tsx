import React from "react";
import { Container } from "@/components/dashboard/Shortcut/styles";
import PlusIcon from "@/assets/icons/plus.svg?react";
import { ShortcutProps } from "@/components/dashboard/Shortcut/types";
import ShortcutMobile from "./medias/ShortcutMobile";
import ShortcutTablet from "./medias/ShortcutTablet";
import ShortcutLaptop from "./medias/ShortcutLaptop";
import ShortcutDesktop from "./medias/ShortcutDesktop";
import ShortcutFallback from "./medias/ShortcutFallback";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";

export default function Shortcut({ icon, qty, title }: ShortcutProps) {
  return (
    <Container>
      <ResponsiveLayout
        mobile={<ShortcutMobile icon={icon} plusIcon={PlusIcon} title={title} qty={qty} />}
        tablet={<ShortcutTablet icon={icon} plusIcon={PlusIcon} title={title} qty={qty} />}
        laptop={<ShortcutLaptop icon={icon} plusIcon={PlusIcon} title={title} qty={qty} />}
        desktop={<ShortcutDesktop icon={icon} plusIcon={PlusIcon} title={title} qty={qty} />}
        fallback={<ShortcutFallback icon={icon} plusIcon={PlusIcon} title={title} qty={qty} />}
      />
    </Container>
  );
}
