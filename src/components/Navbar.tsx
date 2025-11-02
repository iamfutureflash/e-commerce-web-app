import { ShoppingCart, Home } from "lucide-react";
import { useCartContext } from "../contexts/CartContext";
import { Link } from "react-router";
import { Button } from "./ui/button";

const Navbar = () => {
  const { getCartCount } = useCartContext();
  const itemCount = getCartCount();

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <Home className="w-6 h-6" />
          <span className="font-semibold text-lg">Store</span>
        </Link>

        <Button variant="ghost" className="relative" asChild>
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
