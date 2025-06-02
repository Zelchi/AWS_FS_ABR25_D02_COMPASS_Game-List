import { useEffect, useState } from "react";

type SmartImageProps = {
  src: string;
  fallback?: string;
  className?: string;
  onValid?: () => void;
};

export default function SmartImage({ src, fallback, className, onValid }: SmartImageProps) {
  const [finalSrc, setFinalSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setFinalSrc(null);
      return;
    }

    let isMounted = true;
    const img = new Image();

    img.onload = () => {
      if (isMounted) {
        setFinalSrc(src);
        onValid?.();
      }
    };

    img.onerror = () => {
      if (isMounted) {
        if (fallback) {
          setFinalSrc(fallback);
        } else {
          setFinalSrc(null);
        }
      }
    };

    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src, fallback, onValid]);

  if (!finalSrc) return null;

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
