import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import CartFooter from "./components/CartFooter";
import Navbar from "./components/Navbar";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <CartProvider>
        {/* <Toaster /> */}
        {/* <Sonner /> */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id/details" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartFooter />
        </BrowserRouter>
      </CartProvider>
  );
}

export default App;
