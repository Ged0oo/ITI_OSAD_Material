# Full Project Documentation

## 1. Project Summary

This Django project implements a complete school management flow with:
- Authentication (signup, login, logout)
- Protected home page
- Students module (display + full CRUD)
- Subjects module (search display + full CRUD)
- Grades module (search display + full CRUD)
- Leaderboard bonus (top 5 students by total score)

Tech stack:
- Python 3
- Django 5.2.x
- SQLite

---

## 2. Functional Requirements Coverage

### Navbar
Implemented navigation includes:
- Home
- Students
- Subjects
- Grade
- Userprofile
- Logout

For unauthenticated users, Login and Signup are shown.

### Home Access Control
- Home page is protected with `@login_required(login_url="login")`.
- User must authenticate before accessing `/`.

### Students
- Display all students
- Create student
- Update student
- Delete student
- Uses POST action dispatch (`create`, `update`, `delete`) in one endpoint

### Subjects
- Display subjects table
- Search by subject name/code
- Create subject
- Update subject
- Delete subject

### Grades
- Display grades table
- Search by:
  - student id
  - student name
  - subject name
  - subject code
- Create grade
- Update grade
- Delete grade

### Bonus: Leaderboard
- Home page shows best 5 students by total score
- Columns:
  - Student name
  - Subjects count
  - Total score

---

## 3. URL Map

- `/admin/` -> Django admin
- `/signup/` -> register new user
- `/login/` -> login
- `/logout/` -> logout
- `/` -> home (auth required)
- `/students/` -> students display + CRUD
- `/subjects/` -> subjects search + CRUD
- `/grade/` -> grades search + CRUD
- `/userprofile/` -> user profile view
- `/contact/` -> feedback list + create

---

## 4. Data Model

### Student
- `name` (CharField)
- `age` (PositiveIntegerField)
- `email` (unique EmailField)
- `image` (optional URLField)

### Subject
- `name` (unique CharField)
- `code` (unique CharField)

### Grade
- `student` (ForeignKey -> Student)
- `subject` (ForeignKey -> Subject)
- `score` (FloatField, 0 to 100)
- Unique constraint on (`student`, `subject`)

### Feedback
- `email`
- `message`
- `date_added`

---

## 5. Main Flow Design

### Authentication Flow
1. New user opens `/signup/`.
2. On successful registration, user is auto-logged in and redirected to `/`.
3. Existing user logs in from `/login/`.
4. Logout invalidates session and redirects to `/login/`.

### Students Delete Flow
1. User clicks Delete in students table row.
2. Form POSTs to `/students/` with:
   - `action=delete`
   - `student_id=<id>`
3. View resolves student using `get_object_or_404`.
4. Student is deleted.
5. Redirect back to `/students/`.

---

## 6. Templates

Implemented templates include:
- `library/base.html`
- `library/home.html`
- `library/login.html`
- `library/signup.html`
- `library/students.html`
- `library/subjects.html`
- `library/grade.html`
- `library/userprofile.html`
- `library/contact.html`

---

## 7. Setup and Run

From project root:

```bash
cd core
python3 manage.py migrate
python3 manage.py runserver
```

Optional admin user:

```bash
python3 manage.py createsuperuser
```

Open app:
- http://127.0.0.1:8000/login/

---

## 8. Validation

Run system checks:

```bash
python3 manage.py check
```

Current status: no system check errors.

---

## 9. Notes

- The project includes an extra `delete_student` view function, but current delete behavior is handled directly in `students()` via the action-based POST flow.
- Search and CRUD behavior are implemented server-side in Django views.
