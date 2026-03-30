# School API Project Documentation

## 1. Overview

This project is a Django + Django REST Framework backend API for managing:

- Students
- Courses
- Student-Course enrollment
- Authentication (signup, login, logout)

The API uses a mixed DRF style:

- **Student** endpoints: Class-Based Views (CBV)
- **Course** endpoints: Function-Based Views (FBV)
- **StudentCourse** endpoints: ViewSet-based views

---

## 2. Tech Stack

- Python 3.10+
- Django 5.2.x
- Django REST Framework
- SQLite (default database)

---

## 3. Project Structure

```text
Lab3/
├── demo/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── demo/
│   │   ├── settings.py
│   │   └── urls.py
│   └── school/
│       ├── models.py
│       ├── serializer.py
│       ├── views.py
│       ├── urls.py
│       └── migrations/
├── venv/
└── README.md
```

---

## 4. Data Model

### 4.1 Student

Fields:

- `id` (auto)
- `name` (required)
- `age` (required)
- `gpa` (required)
- `email` (required, unique)
- `username` (required)
- `password` (required, hashed in serializers)

### 4.2 Course

Fields:

- `id` (auto)
- `name`
- `description`
- `students` (ManyToMany to Student)

### 4.3 StudentCourse

Join table for student-course enrollment.

Fields:

- `id` (auto)
- `student` (FK)
- `course` (FK)

Constraints:

- Unique pair (`student`, `course`) via `unique_student_course`.

### 4.4 SchoolClass

Fields:

- `id` (auto)
- `name`
- `students` (ManyToMany to Student)

### 4.5 StudentToken

Used for persistent server-side token sessions.

Fields:

- `id` (auto)
- `student` (OneToOne to Student)
- `token` (unique)
- `created_at`
- `updated_at`

---

## 5. Authentication & Session Flow

This project uses signed tokens (`django.core.signing`) plus a token table (`StudentToken`) for active-session checks.

### Login

1. User submits `username` and `password`.
2. Password is validated with `check_password`.
3. Signed token is generated.
4. Token is stored/updated in `StudentToken` for that student.
5. Token is returned in response.

### Authenticated Requests

- Client sends token in `Authorization` header.
- Server verifies:
  - Signature validity
  - Token exists in `StudentToken`
  - Token belongs to student in payload

### Logout

- Client calls logout endpoint with token in `Authorization` header.
- Token row is deleted from `StudentToken`.
- Token becomes inactive immediately.

---

## 6. API Endpoints

Base URL: `http://localhost:8000/`

### 6.1 Auth

#### `POST /signup/`
Create student account.

Request body:

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

Response:

```json
{
  "id": 1,
  "username": "mnagy156",
  "email": "monagy@iti.com"
}
```

#### `POST /login/`
Login and receive token.

Request body:

```json
{
  "username": "mnagy156",
  "password": "010250mN"
}
```

Response (example):

```json
{
  "message": "Login successful",
  "token": "<signed-token>",
  "id": 1,
  "username": "mnagy156",
  "email": "monagy@iti.com"
}
```

#### `POST /logout/`
Invalidate current token.

Headers:

```text
Authorization: Bearer <signed-token>
```

Response:

```json
{
  "message": "Logout successful"
}
```

---

### 6.2 Students

#### `GET /students/`
List all students.

#### `POST /students/`
Create a student directly (all required fields expected).

#### `GET /students/<id>/`
Get student details.

#### `DELETE /students/<id>/`
Delete student.

---

### 6.3 Courses (for logged-in student)

#### `GET /courses/`
List logged-in student's enrollments.

Headers:

```text
Authorization: Bearer <signed-token>
```

#### `POST /courses/`
Enroll logged-in student.

Two supported payload patterns:

1. Enroll into existing course

```json
{
  "course_id": 3
}
```

2. Create and enroll in a new course

```json
{
  "name": "Algorithms",
  "description": "Algorithm analysis and design"
}
```

Headers:

```text
Authorization: Bearer <signed-token>
```

---

### 6.4 Courses by student id

#### `GET /students/<id>/courses/`
List enrollments for a specific student.

#### `POST /students/<id>/courses/`
Enroll specified student to existing/new course (same payload shape as `/courses/`).

---

## 7. Serializers Summary

### StudentSerializer

- `password` is write-only.
- Password is hashed on create and update.
- Required fields enforced: `name`, `age`, `gpa`, `email`, `username`, `password`.

### RegisterStudentSerializer

- Used by signup endpoint.
- Enforces all required registration/student fields.
- Hashes password before save.

### StudentCourseSerializer

- Returns:
  - `id`
  - `student`
  - `student_name`
  - `course`
  - `course_name`

---

## 8. Running the Project

From `Lab3/demo`:

```bash
python3 manage.py migrate
python3 manage.py runserver
```

Server default URL:

```text
http://127.0.0.1:8000/
```

---

## 9. Development Notes

- This API currently uses signed custom tokens plus DB token state (not DRF TokenAuthentication/JWT package).
- `DEBUG = True` in development settings.
- SQLite is used for local development.
- API views are function-based, not class-based.

---

## 10. Suggested Future Improvements

1. Add token expiry and refresh strategy.
2. Add authorization rules per endpoint (owner/admin permissions).
3. Add automated tests in `school/tests.py`.
4. Add OpenAPI/Swagger docs (drf-spectacular or drf-yasg).
5. Normalize course enrollment by using `through=StudentCourse` on `Course.students` if desired as the single source of truth.
