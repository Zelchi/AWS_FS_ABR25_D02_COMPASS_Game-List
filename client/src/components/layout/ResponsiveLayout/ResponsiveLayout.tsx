import React from "react";
import { useGlobal } from "@/contexts/globalContext";

type ResponsiveLayoutProps = {
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  laptop?: React.ReactNode;
  desktop?: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function ResponsiveLayout({
  mobile,
  tablet,
  laptop,
  desktop,
  fallback = null,
}: ResponsiveLayoutProps) {
  const { isMobile, isTablet, isLaptop, isDesktop } = useGlobal();

  if (isMobile) return <>{mobile}</>;
  if (isTablet) return <>{tablet}</>;
  if (isLaptop) return <>{laptop}</>;
  if (isDesktop) return <>{desktop}</>;
  return <>{fallback}</>;
}
