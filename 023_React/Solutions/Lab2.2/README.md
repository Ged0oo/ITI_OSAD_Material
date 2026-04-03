# To-Do App (React + Vite + Tailwind)

A simple and clean to-do application built with React, bundled by Vite, and styled with Tailwind CSS.

## Project Overview

This project demonstrates core React concepts:

- Component-based UI
- Local state management with `useState`
- Parent-child communication via props and callback functions
- Immutable state updates for add, delete, and update actions
- Basic form handling and validation

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- ESLint 9

## Features

- Display an initial list of tasks
- Add a new task using a form
- Auto-generate incremental IDs for new tasks
- Delete tasks
- Toggle task status between completed and pending
- Show total number of tasks
- Responsive light-themed UI

## Folder Structure

```text
Lab2.2/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ data/
│  │  └─ Tasks.js
│  ├─ pages/
│  │  ├─ HomePage.jsx
│  │  └─ components/
│  │     ├─ AddTask.jsx
│  │     ├─ TaskItem.jsx
│  │     └─ TaskList.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ eslint.config.js
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## Main Project Parts

### 1) Entry Point

- `src/main.jsx`
- Renders the root React app using `createRoot`.

### 2) App Shell

- `src/App.jsx`
- Provides top-level container width and spacing.
- Renders `HomePage`.

### 3) Page Container

- `src/pages/HomePage.jsx`
- Holds the main task state in `userTasks`.
- Imports initial tasks from `src/data/Tasks.js`.
- Contains business logic handlers:
  - `handleAddTask(task)`
  - `handleDeleteTask(taskId)`
  - `handleUpdateTask(updatedTask)`

### 4) Components

- `src/pages/components/AddTask.jsx`
  - Controlled form for title/description.
  - Calls parent callback to add a task.

- `src/pages/components/TaskList.jsx`
  - Receives tasks as props.
  - Renders total count.
  - Displays empty-state message when no tasks exist.
  - Maps task array into `TaskItem` components.

- `src/pages/components/TaskItem.jsx`
  - Renders single task details.
  - Shows status badge (Completed/Pending).
  - Triggers delete and complete/incomplete toggle actions.

### 5) Initial Data

- `src/data/Tasks.js`
- Contains starter tasks used to initialize page state.

### 6) Styling

- `src/index.css`
  - Imports Tailwind (`@import "tailwindcss";`).
  - Defines base layer styles for `body` and `#root`.
- Most styling is applied via Tailwind utility classes in JSX.

### 7) Build Tool Configuration

- `vite.config.js`
  - Enables React plugin and Tailwind Vite plugin.

## State and Data Flow

1. `HomePage` stores the source of truth in `userTasks`.
2. `AddTask` sends new task payload to `handleAddTask`.
3. `handleAddTask` computes next incremental ID and appends the task.
4. `TaskList` receives `userTasks` and renders each task.
5. `TaskItem` sends actions upward:
   - Delete by ID
   - Toggle completion by sending an updated task object
6. `HomePage` updates state immutably, causing UI rerender.

## How Incremental IDs Work

When a new task is added, `HomePage` calculates:

- `1` if task list is empty
- otherwise: `max(existing IDs) + 1`

This keeps IDs numeric and increasing even after deletions.

## Available Scripts

From the project root:

- `npm install` - install dependencies
- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the local URL shown in terminal (usually `http://localhost:5173`).

## Possible Future Improvements

- Edit task title/description in place
- Filter tasks (All / Completed / Pending)
- Persist tasks in `localStorage` or backend API
- Add due dates and task priorities
- Add animations for smoother UX

## License

This project is for educational/lab practice use.
