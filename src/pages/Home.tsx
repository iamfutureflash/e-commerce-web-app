import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import useProduct from "@/hooks/useProduct";
import { Loader2 } from "lucide-react";

const Home = () => {
  const {
    filteredProducts,
    loading,
    categories,
  } = useProduct();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Shop Collection
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover our curated selection of quality products
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProductFilters
          categories={categories}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
