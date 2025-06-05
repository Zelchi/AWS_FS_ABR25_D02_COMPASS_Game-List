import React from "react";
import { Container } from "@/components/dashboard/Shortcut/styles";
import PlusIcon from "@/assets/icons/plus.svg?react";
import { ShortcutProps } from "@/components/dashboard/Shortcut/types";
import ShortcutMobile from "./medias/ShortcutMobile";
import ShortcutTablet from "./medias/ShortcutTablet";
import ShortcutLaptop from "./medias/ShortcutLaptop";
import ShortcutDesktop from "./medias/ShortcutDesktop";
import ShortcutFallback from "./medias/ShortcutFallback";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout/ResponsiveLayout";

export default function ShortcutItem({ icon, qty, title, onClick }: ShortcutProps) {
  return (
    <Container>
      <ResponsiveLayout
        mobile={
          <ShortcutMobile
            icon={icon}
            plusIcon={PlusIcon}
            title={title}
            qty={qty}
            onClick={onClick}
          />
        }
        tablet={
          <ShortcutTablet
            icon={icon}
            plusIcon={PlusIcon}
            title={title}
            qty={qty}
            onClick={onClick}
          />
        }
        laptop={
          <ShortcutLaptop
            icon={icon}
            plusIcon={PlusIcon}
            title={title}
            qty={qty}
            onClick={onClick}
          />
        }
        desktop={
          <ShortcutDesktop
            icon={icon}
            plusIcon={PlusIcon}
            title={title}
            qty={qty}
            onClick={onClick}
          />
        }
        fallback={
          <ShortcutFallback
            icon={icon}
            plusIcon={PlusIcon}
            title={title}
            qty={qty}
            onClick={onClick}
          />
        }
      />
    </Container>
  );
}
