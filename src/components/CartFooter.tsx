import { useCartContext } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';

const CartFooter = () => {
  const { getCartTotal, getCartCount } = useCartContext();
  const itemCount = getCartCount();
  const total = getCartTotal();

  if (itemCount === 0) return null;

  return (
    <Link to="/cart">
      <footer className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground shadow-lg z-50 cursor-pointer hover:opacity-95 transition-opacity">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              </div>
              <div>
                <p className="text-sm opacity-90">Your Cart</p>
                <p className="font-semibold">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Total</p>
              <p className="text-2xl font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </footer>
    </Link>
  );
};

export default CartFooter;
