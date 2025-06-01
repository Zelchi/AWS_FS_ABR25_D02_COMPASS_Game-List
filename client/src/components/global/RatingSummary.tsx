import { ReactNode } from "react";

const ratingLabels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export function normalizeRating(value: number, maxValue: number): number {
  if (maxValue <= 0) return 1;

  const ratio = value / maxValue;
  const scaled = ratio * 4 + 1;

  return Math.round(Math.min(5, Math.max(1, scaled)));
}

type RatingSummaryProps = {
  className?: string;
  rating: number;
  maxRating: number;
  color?: string;
  bgColor?: string;
};

export default function RatingSummary({
  className,
  rating = 4,
  maxRating = 5,
  color = "#000",
  bgColor = "#ddd",
}: RatingSummaryProps) {
  return (
    <>
      <svg className={className} viewBox="0 0 44 42" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="halfFill" x1="0" y1="0" x2="44" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset={`${(rating / maxRating) * 100}%`} stopColor={color} />
            <stop offset={`${(rating / maxRating) * 100}%`} stopColor={bgColor} />
          </linearGradient>
        </defs>

        <path
          d="M43 16.5H26.875L22 1.5L17.125 16.5H1L14.125 25.5L9.0625 40.5L22 31.125L34.9375 40.5L29.875 25.5L43 16.5Z"
          fill="url(#halfFill)"
          stroke="none"
        />
      </svg>
      {maxRating > 5 ? ratingLabels[normalizeRating(rating, maxRating)] : ratingLabels[rating]}
    </>
  );
}
