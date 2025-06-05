import React, { useRef, useEffect, useState } from "react";

type IconProps = {
  className?: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  fillColor?: string;
  strokeColor?: string;
  role?: "button" | undefined;
  onClick?: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
};

export default function Icon({
  className,
  icon: SvgIcon,
  fillColor,
  strokeColor,
  role,
  onClick,
  onHoverIn,
  onHoverOut,
}: IconProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [iconName, setIconName] = useState<string | undefined>("");

  useEffect(() => {
    if (svgRef.current) {
      const name = svgRef.current.getAttribute("data-name");
      setIconName(name?.toLowerCase());
    }
  }, [SvgIcon]);

  const isOutline = iconName?.includes("outline");

  const resolvedFill = fillColor ?? (isOutline ? "currentColor" : "none");
  const resolvedStroke = strokeColor ?? (isOutline ? "none" : "currentColor");

  return (
    <SvgIcon
      className={className}
      ref={svgRef}
      role={role}
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      fill={resolvedFill}
      stroke={resolvedStroke}
    />
  );
}
