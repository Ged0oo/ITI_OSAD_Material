# ITI Django Lab 1 - School System

A simple Django web application for managing students and collecting contact feedback.

## Project Overview

This project contains one Django project (`core`) and one app (`library`) with:

- A home page
- A student management page (add and delete students)
- A contact page (submit and list feedback messages)
- Shared styling with static CSS and a logo image

## Tech Stack

- Python 3
- Django 5.2.x
- SQLite3 (default development database)
- HTML templates + CSS static files

## Folder Structure

```text
Lab1/
├── README.md
└── core/
    ├── manage.py
    ├── db.sqlite3
    ├── core/
    │   ├── settings.py
    │   ├── urls.py
    │   ├── asgi.py
    │   └── wsgi.py
    └── library/
        ├── models.py
        ├── views.py
        ├── migrations/
        ├── static/library/
        │   ├── style.css
        │   └── logo.jpeg
        └── templates/library/
            ├── base.html
            ├── home.html
            ├── students.html
            └── contact.html
```

## Application Routes

Defined in `core/core/urls.py`:

- `/` -> Home page
- `/students/` -> Students page (list + add via POST)
- `/students/delete/<student_id>/` -> Delete student via POST
- `/contact/` -> Contact page (submit and list feedback)
- `/admin/` -> Django admin

## Data Models

Defined in `core/library/models.py`.

### Student

- `name`: `CharField(max_length=120)`
- `age`: `PositiveIntegerField()`
- `email`: `EmailField(unique=True)`
- `image`: `URLField(blank=True, null=True)`

### Feedback

- `email`: `EmailField()`
- `message`: `TextField()`
- `date_added`: `DateTimeField(auto_now_add=True)`

## How It Works

### Students Page

- GET: loads all students ordered by ID
- POST: creates a new student from form inputs
- Delete uses a dedicated POST endpoint with student ID

### Contact Page

- GET: loads submitted feedback ordered by newest first
- POST: creates a feedback entry then redirects back to contact page

## Setup and Run

1. Move into the Django project directory:

```bash
cd core
```

2. (Optional) Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

3. Install Django:

```bash
pip install django
```

4. Apply migrations:

```bash
python3 manage.py migrate
```

5. Start development server:

```bash
python3 manage.py runserver
```

6. Open in browser:

- http://127.0.0.1:8000/

## Migrations

Current app migrations in `core/library/migrations/`:

- `0001_initial.py`: creates `Student` and `Feedback`
- `0002_alter_student_image.py`: changes `Student.image` from `ImageField` to `URLField`

## Static and Templates

- Global layout and nav: `core/library/templates/library/base.html`
- Home page: `core/library/templates/library/home.html`
- Students page: `core/library/templates/library/students.html`
- Contact page: `core/library/templates/library/contact.html`
- Styles: `core/library/static/library/style.css`
- Logo image: `core/library/static/library/logo.jpeg`

## Validation Status

Project health check command:

```bash
python3 manage.py check
```

Result at documentation time: no system issues found.

## Notes

- This project uses Django default development settings (`DEBUG=True`).
- `ALLOWED_HOSTS` is currently empty for local development.
- `MEDIA_URL` and `MEDIA_ROOT` are configured in settings, but current student images are stored as external URLs.
