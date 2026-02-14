# API Validation Documentation

## Overview
This project now includes comprehensive validation for all API endpoints using the **Joi** validation library. All request bodies, parameters, and data are validated before processing.

## Installation
Run the following command to install the new dependencies:
```bash
npm install
```

## Validation Features

### 1. User Endpoints

#### POST /users - Create User
**Request Body Validation:**
- `username` (required): Alphanumeric string, 8-50 characters
- `firstName` (required): String, 3-15 characters
- `lastName` (required): String, 3-15 characters
- `dob` (optional): Valid date format

**Example Request:**
```json
{
  "username": "johndoe123",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01"
}
```

**Error Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "username",
      "message": "Username must be at least 8 characters long"
    }
  ]
}
```

#### GET /users - Get All Users
- No parameters required
- Returns array of user first names

#### GET /users/:id/products - Get User's Products
**Parameter Validation:**
- `id` (required): Valid MongoDB ObjectId format

**Error Response (400):**
```json
{
  "error": "Invalid user ID format"
}
```

#### PATCH /users/:id - Update User
**Parameter Validation:**
- `id` (required): Valid MongoDB ObjectId format

**Body Validation (at least one field required):**
- `username` (optional): Alphanumeric string, 8-50 characters
- `firstName` (optional): String, 3-15 characters
- `lastName` (optional): String, 3-15 characters
- `dob` (optional): Valid date format

#### DELETE /users/:id - Delete User
**Parameter Validation:**
- `id` (required): Valid MongoDB ObjectId format

---

### 2. Product Endpoints

#### POST /products - Create Product
**Request Body Validation:**
- `owner` (required): Valid MongoDB ObjectId
- `name` (required): String, 5-20 characters
- `quantity` (required): Positive integer ≥ 1
- `categories` (optional): Array of strings (1-50 chars each)

**Example Request:**
```json
{
  "owner": "507f1f77bcf86cd799439011",
  "name": "Laptop Pro",
  "quantity": 10,
  "categories": ["Electronics", "Computers"]
}
```

#### PATCH /products/:id - Update Product
**Parameter Validation:**
- `id` (required): Valid MongoDB ObjectId format

**Body Validation (at least one field required):**
- `name` (optional): String, 5-20 characters
- `categories` (optional): Array of strings

#### DELETE /products/:id - Delete Product
**Parameter Validation:**
- `id` (required): Valid MongoDB ObjectId format

#### PATCH /products/:id/stock - Update Product Stock
**Parameter Validation:**
- `id` (required): Valid MongoDB ObjectId format

**Body Validation:**
- `operation` (required): Must be "restock" or "destock"
- `quantity` (required): Positive integer ≥ 1

**Example Request:**
```json
{
  "operation": "restock",
  "quantity": 5
}
```

---

## Error Handling

All endpoints now include comprehensive error handling:

### Validation Errors (400)
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "fieldName",
      "message": "Error description"
    }
  ]
}
```

### Not Found Errors (404)
```json
{
  "error": "User not found"
}
```

### Conflict Errors (409)
```json
{
  "error": "Username already exists"
}
```

### Server Errors (500)
```json
{
  "error": "Internal server error"
}
```

---

## Validation Rules Summary

### User Validations
| Field | Type | Min | Max | Required | Notes |
|-------|------|-----|-----|----------|-------|
| username | alphanumeric | 8 | 50 | Yes | Must be unique |
| firstName | string | 3 | 15 | Yes | |
| lastName | string | 3 | 15 | Yes | |
| dob | date | - | - | No | ISO date format |

### Product Validations
| Field | Type | Min | Max | Required | Notes |
|-------|------|-----|-----|----------|-------|
| owner | MongoDB ID | - | - | Yes | Must be valid ObjectId |
| name | string | 5 | 20 | Yes | Must be unique |
| quantity | integer | 1 | - | Yes | Positive integer only |
| categories | array | - | - | No | String items (1-50 chars) |

### Stock Operation Validations
| Field | Type | Values | Required |
|-------|------|--------|----------|
| operation | string | restock, destock | Yes |
| quantity | integer | > 0 | Yes |

---

## Database Constraints

The following constraints are enforced at both application and database levels:

### Users Collection
- `username`: Unique, required, 8+ characters, alphanumeric
- `firstName`: Required, 3-15 characters
- `lastName`: Required, 3-15 characters
- `dob`: Optional, date format
- Timestamps: createdAt, updatedAt (automatic)

### Products Collection
- `owner`: Required, reference to User
- `name`: Unique, required, 5-20 characters
- `quantity`: Required, minimum 1
- `categories`: Default ["General"], array of strings
- Timestamps: createdAt, updatedAt (automatic)

---

## Testing the API

### Using cURL

**Create User:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser123",
    "firstName": "Test",
    "lastName": "User",
    "dob": "1995-05-15"
  }'
```

**Create Product:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "USER_ID_HERE",
    "name": "Product Name",
    "quantity": 5,
    "categories": ["Category1"]
  }'
```

**Update Stock:**
```bash
curl -X PATCH http://localhost:3000/products/PRODUCT_ID/stock \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "restock",
    "quantity": 10
  }'
```

---

## Implementation Details

### Files Modified/Created

1. **utils/validations.js** (NEW)
   - Joi schemas for all request validations
   - Validation middleware function
   - Custom error messages for better UX

2. **controllers/users.js** (UPDATED)
   - Added error handling with status codes
   - Enhanced response objects
   - Duplicate key error handling (409)

3. **controllers/products.js** (UPDATED)
   - Added comprehensive error handling
   - Fixed updateStock function (was returning response objects directly)
   - Enhanced validation in updateStock

4. **routers/users.js** (UPDATED)
   - Integrated validation middleware
   - Added proper error handling in all endpoints
   - MongoDB ID validation for parameters
   - Proper HTTP status codes

5. **routers/products.js** (UPDATED)
   - Integrated validation middleware
   - Added proper error handling in all endpoints
   - MongoDB ID validation for parameters
   - Proper HTTP status codes

6. **index.js** (UPDATED)
   - Improved error handler
   - Better 404 responses
   - Development error stack traces

7. **package.json** (UPDATED)
   - Added `joi` dependency (v17.11.0)

---

## Benefits

✅ **Input Validation**: All user inputs are validated before processing
✅ **Error Consistency**: Standardized error messages across all endpoints
✅ **Security**: Prevents invalid data from being stored in database
✅ **User Experience**: Clear, descriptive error messages
✅ **Database Integrity**: Ensures only valid data reaches the database
✅ **Type Safety**: Joi provides runtime type checking
✅ **Maintainability**: Centralized validation rules in one file
