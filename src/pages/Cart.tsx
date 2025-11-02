import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { ArrowLeft, Trash } from "lucide-react";
import { Link } from "react-router";

const Cart = () => {
  const { items, removeFromCart, getCartTotal } = useCartContext();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-muted-foreground mb-8">
          Add some products to get started!
        </p>
        <Link to="/">
          <Button>
            <ArrowLeft className="mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground py-6 shadow-md">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-primary-foreground hover:opacity-80 mb-4"
          >
            <ArrowLeft className="mr-2" />
            Back to Shop
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/product/${item.id}/details`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.id}/details`}>
                  <h3 className="font-semibold text-card-foreground mb-1 hover:underline hover:cursor-pointer">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
                <p className="text-lg font-bold text-primary mt-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="cursor-pointer bg-red-600/80"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove from cart"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-card-foreground">
              Total:
            </span>
            <span className="text-3xl font-bold text-primary">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Cart;
