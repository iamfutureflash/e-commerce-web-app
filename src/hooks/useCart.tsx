import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import type { Product } from "@/interface";
import { Check, MoveRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

const useCart = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart, isProductPresentInCart } = useCartContext();
  const isPresentInCart = isProductPresentInCart(Number(id));
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
      setAdded(true);
      toast.success("Added to cart!", {
        description: product.title,
      });
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const renderCartButton = () => {
    if (added) {
      return (
        <Button
          size="lg"
          className="w-full cursor-pointer md:w-auto transition-all "
        >
          <>
            <Check className="w-5 h-5 mr-2 transform-3d animate-in" />
            Added to Cart
          </>
        </Button>
      );
    } else if (isPresentInCart) {
      return (
        <Button
          size="lg"
          className="w-full cursor-pointer md:w-auto transition-all"
          asChild
        >
          <Link to={"/cart"}>
            Go to Cart
            <MoveRight className="w-5 h-5 mr-2 move-right-animation" />
          </Link>
        </Button>
      );
    } else {
      return (
        <Button
          size="lg"
          onClick={handleAddToCart}
          className="w-full cursor-pointer md:w-auto transition-all"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      );
    }
  };

  return { product, loading, renderCartButton, categories };
};

export default useCart;
