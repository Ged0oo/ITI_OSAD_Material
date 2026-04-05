# ITI React Lab 5 - E-Commerce Store

A modern React + Vite e-commerce application that demonstrates routing, global state management with Redux Toolkit, multilingual support (English/Arabic), form handling with Formik, validation with Yup, and a unified Tailwind CSS design system.

## Table of Contents

1. Overview
2. Features
3. Tech Stack
4. Project Structure
5. Getting Started
6. Available Scripts
7. Application Routes
8. State Management (Redux Toolkit)
9. Internationalization (Language Context)
10. Forms and Validation (Formik + Yup)
11. Styling and Design System
12. Data Source
13. Development Notes
14. Future Improvements

## Overview

This project is a small e-commerce storefront where users can:

- Browse paginated products
- Open product details
- Add/remove items from cart and manage quantities
- Fill contact and registration forms with validation
- Switch language between English and Arabic

The app is built with lazy-loaded pages for better performance and a consistent color palette for cohesive UI behavior.

## Features

- Product listing with pagination
- Product details page with pricing, stock, shipping info, QR support, and reviews
- Cart management using Redux Toolkit
- Dynamic cart badge in navigation
- Multilingual UI (English/Arabic) with RTL support
- Register form with strong password and confirmation validation
- Contact form with validation and success feedback
- Shared primary/secondary/neutral color system using Tailwind CSS theme tokens

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Redux Toolkit + React Redux
- Formik
- Yup
- Tailwind CSS 4
- ESLint

## Project Structure

```text
.
|- public/
|- src/
|  |- app/
|  |  |- store.js
|  |- components/
|  |  |- Footer.jsx
|  |  |- Navbar.jsx
|  |  |- Pagination.jsx
|  |  |- ProductCard.jsx
|  |- context/
|  |  |- LanguageContext.jsx
|  |- feature/
|  |  |- cart/
|  |     |- cartSlice.js
|  |- pages/
|  |  |- About.jsx
|  |  |- Cart.jsx
|  |  |- ContactUs.jsx
|  |  |- Home.jsx
|  |  |- NotFound.jsx
|  |  |- ProductDetails.jsx
|  |  |- ProductsList.jsx
|  |  |- Register.jsx
|  |- translations/
|  |  |- translations.js
|  |- validations/
|  |  |- contactSchema.js
|  |  |- registerSchema.js
|  |- App.jsx
|  |- index.css
|  |- main.jsx
|- package.json
|- vite.config.js
|- eslint.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Then open the local URL shown in terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Build production bundle
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint checks

## Application Routes

- `/`: Home page
- `/about`: About page
- `/products`: Paginated product list
- `/products/:id`: Product details page
- `/cart`: Shopping cart page
- `/contactus`: Contact form page
- `/register`: Register form page
- `*`: Not found page

## State Management (Redux Toolkit)

Cart state is managed in `src/feature/cart/cartSlice.js` and provided via `src/app/store.js`.

### Cart capabilities

- Add product to cart
- Increment/decrement quantity
- Remove single item
- Clear entire cart
- Calculate cart count and total dynamically

### Data shape

Cart items are stored as:

```js
{
	product: { ...productObject },
	quantity: number
}
```

## Internationalization (Language Context)

Language state is handled with React Context in `src/context/LanguageContext.jsx`.

### Supported languages

- English (`en`)
- Arabic (`ar`)

### Behavior

- Toggle language from navbar
- Text values loaded from `src/translations/translations.js`
- `dir` switches to RTL when Arabic is active

## Forms and Validation (Formik + Yup)

### Register form

Located at `src/pages/Register.jsx` with schema in `src/validations/registerSchema.js`.

Validation rules include:

- Name is required
- Username is required and limited to alphanumeric + underscore
- Email must be valid and required
- Password must include:
  - Minimum 8 characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character
- Confirm password must match password

### Contact form

Located at `src/pages/ContactUs.jsx` with schema in `src/validations/contactSchema.js`.

Validation rules include:

- Name is required
- Email must be valid and required
- Message length: 10 to 500 characters

On successful submit, a temporary success message is displayed.

## Styling and Design System

The application uses Tailwind CSS with a centralized color token system in `src/index.css`.

### Palette groups

- Primary (`primary-50` to `primary-900`): Main call-to-action and focus surfaces
- Secondary (`secondary-50` to `secondary-900`): Supporting highlights and positive emphasis
- Neutral (`neutral-50` to `neutral-900`): Text, backgrounds, borders, layout surfaces

### UI consistency goals

- Unified button states across views:
  - Hover
  - Focus ring
  - Active state
- Consistent card, border, and text colors
- Shared layout surfaces for readability and visual cohesion

## Data Source

Products are fetched from DummyJSON API:

- List endpoint: `https://dummyjson.com/products?limit={limit}&skip={skip}`
- Details endpoint: `https://dummyjson.com/products/{id}`

## Development Notes

- Pages and shared UI components are lazy-loaded through `React.lazy` + `Suspense`.
- `main.jsx` should wrap App with Redux Provider to supply cart store globally.
- Tailwind utility classes are the primary styling approach.

## Future Improvements

- Add loading skeletons for product list/details
- Add toast notifications for cart actions
- Persist cart in local storage
- Add unit/integration tests for reducers and forms
- Add authentication flow for registration/login
- Add better RTL-specific spacing and icon mirroring
