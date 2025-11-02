import ProductCard from "@/components/product/ProductCard";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import useProduct from "@/hooks/useProduct";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router";

const ProductDetail = () => {
  const { product, loading, renderCartButton } = useCart();
  const { products } = useProduct();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Product not found
          </h2>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-secondary/30 rounded-lg p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-96 object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 text-sm text-amber-300 font-semibold">
                <StarRating rating={product.rating.rate} />
                {product.rating.rate}
                <span className="">({product.rating.count} reviews)</span>
              </div>
            </div>
            {renderCartButton()}
            <p className="text-foreground/80 leading-relaxed mb-8">
              {product.description}
            </p>
          </div>
        </div>

        {products.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              More from {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((data) => data.category === product.category)
                .map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    title={relatedProduct.title}
                    price={relatedProduct.price}
                    image={relatedProduct.image}
                    category={relatedProduct.category}
                  />
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
