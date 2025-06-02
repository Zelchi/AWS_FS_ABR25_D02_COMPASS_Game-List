import { useEffect, useState } from "react";

const banList: string[] = [];

type SmartImageProps = {
    src: string;
    fallback?: string;
    className?: string;
    onValid?: () => void;
};

export default function SmartImage({ src, fallback, className, onValid }: SmartImageProps) {
    const [finalSrc, setFinalSrc] = useState<string | null>(null);
    const [attempts, setAttempts] = useState<number>(0);

    useEffect(() => {
        setAttempts(0);
    }, [src]);

    useEffect(() => {
        if (!src) {
            setFinalSrc(null);
            return;
        }

        if (attempts >= 3) {
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
                if (attempts >= 3) {
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
    }, [src, attempts, fallback]);

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
