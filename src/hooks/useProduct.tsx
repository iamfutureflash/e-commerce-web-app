import type { Product } from "@/interface";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

const useProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const selectedRating = searchParams.get("rating") || "all";

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "all" && value !== "") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    return uniqueCategories;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesRating =
        selectedRating === "all" ||
        (selectedRating === "4+" && product.rating.rate >= 4) ||
        (selectedRating === "3+" && product.rating.rate >= 3) ||
        (selectedRating === "2+" && product.rating.rate >= 2);

      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [products, searchTerm, selectedCategory, selectedRating]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return {
    products,
    loading,
    categories,
    filteredProducts,
    searchTerm,
    selectedCategory,
    selectedRating,
    updateSearchParams,
  };
};

export default useProduct;
