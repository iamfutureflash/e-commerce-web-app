# e-commerce-web-app (Vite + React + TypeScript)

This repository is an example e-commerce storefront built with React, TypeScript and Vite. It demonstrates a small but realistic shopping flow and contains examples of:

- Client-side routing with React Router
- Global state via a Cart context
- Custom hooks for data fetching and cart behaviors
- Presentational UI components (cards, inputs, buttons) and tailwind-based styling

Live demo
-- Replace the placeholder below with your deployment URL once you have deployed to Vercel:

Live: [https://VERCEL_DEPLOYMENT_URL_HERE](https://e-commerce-web-app-pearl.vercel.app/)

If you want me to add the real Vercel link, provide the URL or authorize a deployment and I can add it.

## Quick start

1. Install dependencies

```bash
npm install
```

1. Run dev server

```bash
npm run dev
```

1. Build for production

```bash
npm run build
npm run preview
```

Dev scripts available (from `package.json`):

- `dev` — vite dev server
- `build` — `tsc -b` (typecheck & project references) followed by `vite build`
- `preview` — serve the built app
- `lint` — runs ESLint

## Routes & Pages

Routing is defined in `src/App.tsx` (the app uses `BrowserRouter` and `Routes`). The app exposes the following routes:

- `/` => Home page (`src/pages/Home.tsx`) — product listing with filters
- `/product/:id/details` => Product detail (`src/pages/ProductDetail.tsx`) — single product + add-to-cart
- `/cart` => Cart page (`src/pages/Cart.tsx`) — view items, remove items, see totals
- `*` => NotFound (`src/pages/NotFound.tsx`)

Note: There's also a `src/Providers.tsx` file that contains an alternate/simple route mapping used for development scaffolding. The real application routing is in `src/App.tsx` which is rendered by `src/main.tsx`.

## Folder structure (what the reviewer should know)

Top-level files of interest:

- `src/App.tsx` — root app wiring: providers, Navbar, routes, CartFooter
- `src/main.tsx` — app entry
- `src/Providers.tsx` — helper provider wrapper (has an alternate route set; currently not used by `main.tsx`)

`src/` breakdown:

- `assets/` — static images and assets
- `components/` — shared components
  - `ui/` — design system primitives (button, input, card, select, etc.)
  - `product/` — product-related components: `ProductCard`, `MiniProductCard`, `ProductFilters`
  - `CartFooter.tsx`, `Navbar.tsx`, `StarRating.tsx`
- `contexts/` — `CartContext.tsx` (global cart provider and hooks: `useCartContext`)
- `hooks/` — custom hooks: `useProduct` (fetch & filter products), `useCart` (fetches single product by id, handles add-to-cart UI)
- `interface/` — TypeScript interfaces (`product.interface.tsx`, `cart.interfcae.tsx`, `index.tsx`)
- `lib/` — utility helpers (e.g., `utils.ts`)
- `pages/` — route-level pages (Home, Cart, ProductDetail, Index, NotFound)

Key files to review

- `src/contexts/CartContext.tsx`
  - Exposes `CartProvider` and `useCartContext()`.
  - Stores cart items in `sessionStorage` and exposes: `items`, `addToCart`, `removeFromCart`, `getCartCount`, `getCartTotal`, `isProductPresentInCart`.
- `src/hooks/useProduct.tsx` (not shown in this README) — responsible for fetching product list and applying filters.
- `src/hooks/useCart.tsx`
  - Uses `useParams` to load a single product from `https://fakestoreapi.com/products/:id`.
  - Exposes `{ product, loading, renderCartButton }` used by `ProductDetail` to show the add-to-cart / goto-cart CTA.

## Data & API

- Product data is fetched from `https://fakestoreapi.com` (see `useCart` & `useProduct` hooks).
- Cart state is persisted to `sessionStorage` so it survives reloads in the current browser session.

## Important implementation notes for reviewers

- Routing: `App.tsx` is the canonical routing file. `Providers.tsx` contains a small demo route set and is safe to ignore unless investigating provider patterns.
- Path aliases: The code uses the `@/` prefix imports (e.g. `@/components`); these are configured via `tsconfig` paths — ensure your editor picks up `tsconfig.json` for IntelliSense.
- Fast Refresh / HMR: keep component exports and hooks separate to avoid Fast Refresh warnings. For example, do not export non-component helpers or hooks from files that also export React components (this repository generally follows that rule — hooks are in `src/hooks` and the context is in `src/contexts`).


## Notes for code reviewers / checklist

- [ ] Confirm `App.tsx` routing matches the intended UX (Home → Product details → Cart)
- [ ] Check `CartContext` edge cases: persistence, number overflow, and missing products
- [ ] Verify that `useCart` handles fetch errors gracefully (it currently logs and sets loading=false)
- [ ] Ensure components are small and focused: `ProductCard`, `ProductFilters` and `Navbar` are the main UI touch points
- [ ] Run `npm run build` locally to confirm type errors and bundler issues.

## Troubleshooting

- If you see Fast Refresh warnings like "Fast refresh only works when a file only exports components", move hooks or constants into their own module (e.g., `src/hooks/*`) so files that export components only export components.
- If imports using `@/` fail, ensure your editor and TypeScript configuration honor `tsconfig.json` path mappings.
