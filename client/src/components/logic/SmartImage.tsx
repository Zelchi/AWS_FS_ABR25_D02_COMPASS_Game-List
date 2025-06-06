import { useEffect, useState } from "react";

const banList: string[] = [];

type SmartImageProps = {
  src: string;
  fallback?: string;
  className?: string;
  onValid?: () => void;
  maxAttempts?: number; 
};

export default function SmartImage({ 
  src, 
  fallback, 
  className, 
  onValid,
  maxAttempts: maxAttemptsFromProps = 2
}: SmartImageProps) {
  const [finalSrc, setFinalSrc] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(maxAttemptsFromProps); 

  useEffect(() => {
    setAttempts(0);
  }, [src]);

  useEffect(() => {
    if (!src) {
      setFinalSrc(null);
      return;
    }

    if (attempts >= maxAttempts) {
      banList.push(src);
      if (fallback) {
        setFinalSrc(fallback);
      } else {
        setFinalSrc(null);
      }
      return;
    }

    let isMounted = true;
    const img = new Image();

    img.onload = () => {
      if (isMounted) {
        setFinalSrc(src);
        onValid && onValid();
      }
    };

    img.onerror = () => {
      if (isMounted) {
        setAttempts((attempt) => ++attempt);
        if (attempts >= maxAttempts) {
          banList.push(src);
          if (fallback) {
            setFinalSrc(fallback);
          } else {
            setFinalSrc(null);
          }
        }
      }
    };

    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src, attempts, fallback, onValid, maxAttempts]);

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
