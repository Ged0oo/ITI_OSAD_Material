# ITI Lab 3 - React Store App

A single-page e-commerce style application built with React, Vite, React Router, and Tailwind CSS.

The app fetches products from the DummyJSON API, supports pagination, shows detailed product information, and includes a client-side shopping cart with quantity management.

## Features

- Browse products with paginated listing
- Open a product details page for full product information
- Add products to cart from both list and details views
- Increase/decrease cart item quantities
- Remove single items or clear entire cart
- Dynamic cart badge in the navbar
- Responsive layout and soft-light color theme
- Fallback routes for unknown pages

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- ESLint 9
- DummyJSON public API

## Project Structure

```text
src/
	components/
		Footer.jsx
		Navbar.jsx
		Pagination.jsx
		ProductCard.jsx
	pages/
		About.jsx
		Cart.jsx
		Home.jsx
		NotFound.jsx
		ProductDetails.jsx
		ProductsList.jsx
	App.jsx
	index.css
	main.jsx
```

## Routes

- `/` -> Home page
- `/about` -> About page
- `/products` -> Products list with pagination
- `/products/:id` -> Product details page
- `/cart` -> Shopping cart page
- `*` -> Not Found page

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Run lint checks

```bash
npm run lint
```

## API Endpoints Used

- Product list (paginated):
  - `https://dummyjson.com/products?limit=12&skip=<offset>`
- Product details:
  - `https://dummyjson.com/products/<id>`

## Cart Logic Summary

- Cart state is managed in `App.jsx` and passed down via props.
- If the same product is added more than once, quantity is incremented instead of creating duplicate lines.
- Total price is calculated using the discounted price per product.

## Notes

- This project currently stores cart data in memory only. Refreshing the browser resets the cart.
- `axios` exists in dependencies, but current API calls are implemented with `fetch`.
