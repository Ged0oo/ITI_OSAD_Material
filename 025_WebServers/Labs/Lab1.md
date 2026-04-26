# Application Description

Develop a simple Student Management API with the following resources:

- Students: `id`, `name`, `age`
- Courses: `id`, `title`

# Part 1: Core Requirements

Implement CRUD operations for the Students resource.

# Part 2: REST Design Rules and Tasks

## 1. Resource-Oriented Design

**Rule:** APIs should use nouns (resources) instead of verbs.

**Correct examples:**

- `/students`
- `/students/{id}`
- `/courses`

**Incorrect examples:**

- `/getStudents`
- `/createStudent`
- `/deleteStudent`

**Task:** Design endpoints to:

- Retrieve all students
- Retrieve a single student by ID
- Create a new student
- Delete a student

## 2. Proper Use of HTTP Methods

**Rule:** Use standard HTTP methods to represent actions.

| Method | Description     |
| ------ | --------------- |
| GET    | Retrieve data   |
| POST   | Create resource |
| PUT    | Update resource |
| DELETE | Remove resource |

**Correct examples:**

- `GET /students`
- `POST /students`
- `PUT /students/{id}`
- `DELETE /students/{id}`

**Incorrect examples:**

- `POST /students/getAll`
- `GET /deleteStudent/{id}`

**Task:** Implement all CRUD operations using the correct HTTP methods.

## 3. Statelessness

**Rule:** Each request must contain all necessary information. The server should not store client state between requests.

**Correct practice:** Send all required data in the request body or parameters.

**Incorrect practice:** Relying on temporary server memory to track user actions.

**Task:** Ensure your API functions correctly without relying on stored session data.

## 4. HTTP Status Codes

**Rule:** Use appropriate HTTP status codes to indicate the result of a request.

**Common codes:**

- `200 OK` - Successful request
- `201 Created` - Resource successfully created
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource does not exist

**Incorrect practice:** Returning `200 OK` for all responses regardless of outcome.

**Task:** Handle:

- Invalid input
- Non-existent student requests

## 5. JSON Format

**Rule:** All requests and responses should use JSON format.

**Correct example:**

```json
{
  "id": 1,
  "name": "Ali",
  "age": 20
}
```

**Incorrect example:** Returning plain text such as: `Student created`

**Task:** Ensure all API responses are in valid JSON format.

## 6. Consistent Naming Conventions

**Rule:** Use consistent and predictable naming across all endpoints.

**Correct examples:**

- `/students`
- `/courses`

**Incorrect examples:**

- `/Students`
- `/student_list`
- `/getCourses`

**Task:** Review and standardize all endpoint names.

# Bonus Task

## Basic HATEOAS

**Rule:** Include links in responses to guide API navigation.

**Task:** Add navigational links to at least one API response.
