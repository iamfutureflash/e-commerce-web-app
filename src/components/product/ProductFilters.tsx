import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "react-router";

const ProductFilters = ({ categories }: { categories: string[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
  return (
    <div className="mb-8 flex gap-4 flex-wrap justify-start">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products by name or description..."
          value={searchTerm}
          onChange={(e) => updateSearchParams("search", e.target.value)}
          className="pl-10 w-96"
        />
      </div>

      <Select
        value={selectedCategory}
        onValueChange={(value) => updateSearchParams("category", value)}
      >
        <SelectTrigger className="sm:w-[200px] w-fit">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-card z-50">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedRating}
        onValueChange={(value) => updateSearchParams("rating", value)}
      >
        <SelectTrigger className="sm:w-[200px] w-fit">
          <SelectValue placeholder="All Ratings" />
        </SelectTrigger>
        <SelectContent className="bg-card z-50">
          <SelectItem value="all">All Ratings</SelectItem>
          <SelectItem value="4+">4+ Stars</SelectItem>
          <SelectItem value="3+">3+ Stars</SelectItem>
          <SelectItem value="2+">2+ Stars</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductFilters;
