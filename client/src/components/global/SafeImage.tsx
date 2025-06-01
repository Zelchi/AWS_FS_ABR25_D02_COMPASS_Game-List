import React, { useEffect, useState } from "react";
import MoreIcon from "@/components/global/MoreIcon";

type SafeImageProps = {
  src: string;
  fallback?: string;
  className?: string;
};

export default function SafeImage({ src, fallback, className }: SafeImageProps) {
  const [finalSrc, setFinalSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setFinalSrc(null);
      return;
    }

    let isMounted = true;
    const img = new Image();

    img.onload = () => isMounted && setFinalSrc(src);
    img.onerror = () => isMounted && setFinalSrc(fallback ?? null);

    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src, fallback]);

  if (!finalSrc) return <MoreIcon />;

  return (
    <span
      className={className}
      style={{
        backgroundImage: `url(${finalSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
