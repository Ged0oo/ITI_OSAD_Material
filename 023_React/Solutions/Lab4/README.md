# React E-Commerce Lab (Vite)

This project is a small e-commerce application built with React, React Router, Redux Toolkit, and Tailwind CSS.

The app demonstrates two state management patterns working together:

- useContext for global UI language and RTL direction.
- Redux Toolkit for cart business state (items, quantities, totals).

## Features

- Product listing with pagination.
- Product details page.
- Add to cart, remove from cart, update quantity, clear cart.
- Computed cart count and cart total with selectors.
- English/Arabic language switch using context.
- RTL support when Arabic is active.
- Client-side routing with not-found fallback route.

## Tech Stack

- React 19
- Vite 8
- React Router DOM
- Redux Toolkit + React Redux
- Tailwind CSS

## Project Structure

```text
src/
	app/
		store.js                    # Redux store configuration
	components/
		Navbar.jsx                  # Uses both context (language) and Redux selector (cart count)
		ProductCard.jsx             # Dispatches addToCart action
		Pagination.jsx
		Footer.jsx
	context/
		LanguageContext.jsx         # LanguageProvider + useLanguage hook
	feature/
		cart/
			cartSlice.js              # Cart reducers, actions, selectors
	pages/
		Home.jsx                    # Uses language context
		About.jsx                   # Uses language context
		ProductsList.jsx            # Fetches paginated products
		ProductDetails.jsx          # Fetches product details, dispatches addToCart
		Cart.jsx                    # Uses cart selectors and dispatches cart actions
		NotFound.jsx
	translations/
		translations.js             # Arabic/English dictionary
	App.jsx                       # Routing + LanguageProvider wrapper
	main.jsx                      # Redux Provider wrapper
```

## State Management Design

### 1) useContext: UI Language State

Language is handled in `src/context/LanguageContext.jsx`.

What it provides:

- `language`: current language key (`en` or `ar`).
- `toggleLanguage`: switches language.
- `trans`: language dictionary for labels/content.
- `rtl`: `true` when current language is Arabic.

Why context is used here:

- Language is app-wide UI preference.
- It avoids prop drilling across pages/components.
- It stays lightweight without reducer boilerplate.

How it is consumed:

- `Navbar.jsx` reads `trans`, `toggleLanguage`, and `rtl`.
- `Home.jsx` and `About.jsx` read translated headings/paragraphs from `trans`.

### 2) Redux Toolkit: Cart Business State

Cart data is handled in `src/feature/cart/cartSlice.js` and registered in `src/app/store.js`.

Actions:

- `addToCart(product)`
- `removeFromCart(productId)`
- `updateQuantity({ productId, quantity })`
- `clearCart()`

Selectors:

- `selectCartItems`
- `selectCartCount`
- `selectCartTotal`

Why Redux is used here:

- Cart state is shared and frequently updated by multiple pages.
- Selectors centralize computed logic (count and totals).
- Business logic is consolidated and testable in one slice.

Where Redux is consumed:

- `ProductCard.jsx` and `ProductDetails.jsx` dispatch `addToCart`.
- `Navbar.jsx` displays cart badge via `selectCartCount`.
- `Cart.jsx` reads `selectCartItems` and `selectCartTotal`, and dispatches updates/removals/clear.

## Data Flow

1. App boots in `main.jsx`, wrapped by Redux `Provider`.
2. `App.jsx` wraps routes with `LanguageProvider`.
3. Product pages fetch data from DummyJSON API.
4. User actions dispatch cart reducers.
5. Selectors derive badge count and final total for rendering.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

- `/` Home
- `/about` About
- `/products` Products list
- `/products/:id` Product details
- `/cart` Cart
- `*` Not found

## API Source

The app currently uses public endpoints from DummyJSON:

- `https://dummyjson.com/products`
- `https://dummyjson.com/products/:id`

## Notes

- The package name in `package.json` is currently `lab3` while this folder is Lab4.
- Context and Redux are intentionally used together to show when each pattern is most appropriate.
