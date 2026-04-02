# Team Users Directory (React + Vite)

A responsive user directory application built with React and Vite.

The app displays a list of users, supports manual search by username/email/phone, and provides a clean card-based UI with role badges.

## Overview

This project demonstrates:

- Component-based React architecture
- State management with useState
- Search filtering logic on local data
- Reusable presentational components
- Professional custom CSS styling

## Features

- User directory with profile cards
- Search by:
  - username
  - email
  - phone number
- Case-insensitive matching
- Search reset flow
- Result count indicator
- Role chip styling by role value
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES modules)
- CSS
- ESLint

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── postcss.config.js
├── public/
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── App.css
    ├── data/
    │   └── users.js
    └── components/
        ├── SearchBar.jsx
        ├── UserList.jsx
        ├── UserCard.jsx
        └── RoleChip.jsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Vite usually starts on:

- http://localhost:5173

If that port is busy, Vite automatically selects another one (for example 5174).

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Lint the project

```bash
npm run lint
```

## How Search Works

In src/App.jsx:

- searchTerm stores current input text
- filteredUsers stores current result set
- hasSearched controls when Reset button is shown

Search behavior:

1. User types in SearchBar input
2. onSearchChange updates searchTerm
3. Clicking Search runs handleSearch
4. Data is filtered by includes on username/email/phone
5. Clicking Reset clears input and restores full user list

## Data Model

User objects are defined in src/data/users.js with fields like:

- id
- username
- name
- email
- phone
- birthday
- role
- profilePicture

## Component Responsibilities

- src/App.jsx
  - Owns page state and business logic
  - Passes handlers and data to child components

- src/components/SearchBar.jsx
  - Controlled input + action buttons

- src/components/UserList.jsx
  - Renders list of cards or empty state

- src/components/UserCard.jsx
  - Displays individual user details

- src/components/RoleChip.jsx
  - Renders role badge with role-based classes

## Styling Notes

- UI styling is implemented with custom CSS in:
  - src/index.css
  - src/App.css
- The design includes responsive grid behavior, polished controls, and role badge variants.

## Potential Improvements

- Trigger search on Enter key
- Add debounce for large datasets
- Add sort options (name, role, date)
- Add pagination or virtualized list
- Add unit tests for filtering logic

## License

This project is intended for educational and training use.
