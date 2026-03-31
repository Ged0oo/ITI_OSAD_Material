# School API - Current Implementation

This README reflects what is currently implemented in code.

## Overview

The project is a Django + Django REST Framework backend that provides:

- Student CRUD APIs
- Course APIs
- Signup/Login/Logout APIs using signed tokens
- Student-to-course enrollment via a join model

The project uses mixed view styles:

- Student endpoints: class-based generic views
- Auth and course endpoints: function-based views

## Tech Stack

- Python 3
- Django 5.2.x
- Django REST Framework
- SQLite (local db)

## Current Data Models

### Student

- id
- name
- age
- gpa
- email (unique)
- username
- password (hashed in serializers)

### Course

- id
- name
- description
- students (ManyToMany with Student)

### StudentCourse

- student (FK -> Student)
- course (FK -> Course)
- unique constraint on `(student, course)`

### StudentToken

- student (OneToOne -> Student)
- token (unique)
- created_at
- updated_at

## Authentication Flow

The app uses `django.core.signing` tokens and stores only active tokens in `StudentToken`.

1. Login validates username/password.
2. A signed token is generated.
3. Token is stored with `StudentToken.objects.update_or_create(...)`.
4. Protected operations read token from `Authorization` header (supports `Bearer <token>` or raw token).
5. Logout deletes token row, immediately invalidating the token.

## API Endpoints (Current)

Base URL (local): `http://127.0.0.1:8000/`

Note: URLs are registered without trailing slashes.

### Auth

- `POST /signup`
- `POST /login`
- `POST /logout`

Example signup body:

```json
{
  "name": "Mohamed Nagy",
  "age": 24,
  "gpa": 3.2,
  "username": "mnagy156",
  "password": "010250mN",
  "email": "monagy@iti.com"
}
```

Example login body:

```json
{
  "username": "mnagy156",
  "password": "010250mN"
}
```

### Students

- `GET /students`
- `POST /students`
- `GET /students/<id>`
- `PUT /students/<id>`
- `PATCH /students/<id>`
- `DELETE /students/<id>`

### Courses

- `GET /courses`
  - Returns all courses.
- `POST /courses`
  - Requires `Authorization` token.
  - If body contains `course_id`, enrolls the logged-in student in an existing course.
  - Otherwise creates a new course from body (`name`, `description`) and enrolls the logged-in student.

- `GET /courses/<id>`
  - Returns course details.
- `DELETE /courses/<id>`
  - Deletes course.

Important implementation note:

- `PUT /courses/<id>` is currently allowed by decorator and follows the delete path in code (same behavior as delete). This is a current behavior issue in implementation, not intended REST behavior.

## Serializer Behavior

### StudentSerializer

- Includes all student fields.
- `password` is write-only and required.
- Hashes password during create.

### RegisterStudentSerializer

- Used by `/signup`.
- Requires: `name`, `age`, `gpa`, `username`, `password`, `email`.
- Hashes password before create.

### CourseSerializer

- Includes all course fields.
- `students` is optional in request payload.

## Run Locally

From `demo/`:

```bash
python3 manage.py migrate
python3 manage.py runserver
```

## Notes

- Custom signed-token auth is used (not DRF TokenAuth/JWT packages).
- Default database is SQLite.
- No `SchoolClass` model in current code.
- No `/students/<id>/courses` routes in current URL config.
