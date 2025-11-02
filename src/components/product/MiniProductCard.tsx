import { Link } from "react-router";
import { Card, CardContent, CardFooter } from "../ui/card";
import type { ProductCardProps } from "@/interface";

const MiniProductCard = ({
  id,
  title,
  price,
  image,
  category,
}: ProductCardProps) => {
  return (
    <Link to={`/product/${id}/details`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in">
        <div className="aspect-square overflow-hidden bg-secondary/30">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            {category}
          </p>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {title}
          </h3>
        </CardContent>
        <CardFooter className="px-4 pb-4">
          <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default MiniProductCard;
