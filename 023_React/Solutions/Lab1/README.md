# Portfolio Website

A modern single-page portfolio built with React, Vite, and Tailwind CSS.

This project presents a personal profile with interactive sections for bio, education, technical skills, and contact information.

## Live Sections

- Header navigation with anchor links
- Hero section with call-to-action buttons
- Bio section with CV download button
- Education timeline
- Technical skills grouped by category
- Contact section with social links and email form
- Footer quick navigation

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- JavaScript (ES Modules)

## UI and Interaction Highlights

- Smooth anchor scrolling across sections
- Staggered reveal animations on first render
- Reusable hover lift effects for cards
- Hover transitions on buttons, links, and icons
- Accessible reduced-motion fallback for users with motion sensitivity

## Project Structure

```text
.
├── public/
├── src/
│   ├── assets/
│   │   └── 1.jpg
│   ├── pages/
│   │   └── home-page/
│   │       ├── home-page.jsx
│   │       └── components/
│   │           ├── header.jsx
│   │           ├── hero.jsx
│   │           ├── bio.jsx
│   │           ├── education.jsx
│   │           ├── skills.jsx
│   │           ├── contacts.jsx
│   │           └── footer.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

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

## Available Scripts

- `npm run dev`: Runs Vite dev server
- `npm run build`: Creates production bundle in `dist/`
- `npm run preview`: Serves production build locally
- `npm run lint`: Runs ESLint checks

## Contact Form Behavior

The contact form uses a `mailto:` flow:

- On submit, it opens the user default mail client
- It pre-fills recipient, subject, and message body
- Current recipient is `mohmmednagy2020@gmail.com`

Note: This is client-side only and does not use a backend email service.

## Customization Guide

- Update profile image: replace `src/assets/1.jpg`
- Update page title: edit `<title>` in `index.html`
- Update social links and email target: edit `src/pages/home-page/components/contacts.jsx`
- Update section text/content: edit component files in `src/pages/home-page/components/`
- Update animations/utilities: edit `src/index.css`

## Tailwind Setup Notes

Tailwind is configured through:

- `@tailwindcss/vite` plugin in `vite.config.js`
- `@import "tailwindcss";` in `src/index.css`

No separate Tailwind config file is required for this setup.

## Future Improvements

- Replace `mailto:` with direct API email sending (EmailJS or backend)
- Add dark mode toggle
- Add project gallery section
- Add unit/component tests
- Add deployment workflow (GitHub Pages or Vercel)
