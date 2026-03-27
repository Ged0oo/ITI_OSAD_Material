# Project Notes

## Overview
This project is a Django-based school system with:
- Authentication (login/signup/logout)
- Students management (create, update, delete, display)
- Subjects management (search + CRUD)
- Grades management (search + CRUD)
- Home leaderboard (top 5 students by total score)

## Main URLs
- `/login/`
- `/signup/`
- `/`
- `/students/`
- `/subjects/`
- `/grade/`
- `/userprofile/`
- `/logout/`

## Current Delete Student Flow
1. Delete button submits a POST form from the students page.
2. Request hits `/students/`.
3. `students` view checks `action == "delete"` and uses `student_id`.
4. Student is deleted and page redirects back to `/students/`.

## TODO Ideas
- Add success/error flash messages.
- Add validation feedback for duplicate entries.
- Add pagination for long tables.
- Add role-based permissions.
