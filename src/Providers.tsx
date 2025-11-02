import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <BrowserRouter>
        {children}
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/product/:id/details"
            element={<div>ProductDetails</div>}
          />
          <Route path="/cart" element={<div>Cart</div>} />
          <Route path="*" element={<div>NotFound</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Providers;
