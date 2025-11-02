export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isProductPresentInCart: (productId: number) => boolean;
}
