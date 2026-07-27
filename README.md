# Electronix — Electronics Store

A single-page electronics store built with React + Vite + Tailwind CSS. Fetches products from [DummyJSON](https://dummyjson.com/) and manages state with Context API.

## Project Structure

```
src/
  types.ts                  — Product & Review type definitions
  utils/api.ts              — fetchProducts() and fetchProduct(id)
  context/
    ThemeContext.tsx         — Dark/light mode toggle, saved to localStorage
    ProductContext.tsx       — Fetches products on mount, stores in global state
    WishlistContext.tsx      — Wishlist Set<id>, add/remove/toggle
  components/
    Navbar.tsx               — Logo, search input, theme toggle, wishlist badge count
    MobileSearch.tsx         — Search bar visible on mobile only
    Filters.tsx              — Category and brand filter buttons
    SortSelect.tsx           — Custom dropdown: sort by price, rating, name
    ProductCard.tsx          — Thumbnail, price, rating, stock badge, wishlist heart
    Spinner.tsx              — Loading spinner
  pages/
    Home.tsx                 — Search + filters + sort + product grid
    ProductDetails.tsx       — Full product info, reviews, wishlist button
    Wishlist.tsx             — Grid of wishlisted products
  App.tsx                    — ThemeProvider + ProductProvider + WishlistProvider + Routes
  main.tsx                   — Entry point (ReactDOM.createRoot)
  index.css                  — Tailwind v4 + Tearline tokens + scrollbar
```

## How It Works

**On app load:** `ProductContext` calls `GET /products?limit=100` once. The 100 products are stored globally. No more API calls after that.

**Search / Filter / Sort:** All happen client-side in `Home.tsx` via `useMemo`. No additional requests.

**Product detail:** Clicking a card navigates to `/product/:id`. The component finds the product already in Context — no new fetch.

**Wishlist:** Clicking the heart on any card toggles that product ID in `WishlistContext`. The Navbar reads `wishlist.size` for the badge.

**API endpoints used:** `GET /products?limit=100` (all products), `GET /products/:id` (single product). No POST/PUT/DELETE — this app is read-only.

**No pagination:** 100 products fits in memory. Real stores with thousands of items would need server-side pagination.

## Run

```bash
pnpm dev
```
