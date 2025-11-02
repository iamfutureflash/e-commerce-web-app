import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const emptyStars = 5 - Math.ceil(rating);
  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="fill-amber-300 stroke-0 w-4 h-4" />
      ))}

      {/* Partial star */}
      {partialStar > 0 && (
        <div className="relative">
          <Star className="fill-gray-300 stroke-0 w-4 h-4" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${0.2 * 100}%` }}
          >
            <Star className="fill-amber-300 stroke-0 w-4 h-4" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="fill-gray-300 stroke-0 w-4 h-4" />
      ))}
    </div>
  );
};
