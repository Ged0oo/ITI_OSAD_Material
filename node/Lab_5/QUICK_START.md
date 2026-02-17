# Inventory Management App - Quick Start Guide

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB running on `mongodb://127.0.0.1:27017/inventory`
- Port 3000 available

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   Or with auto-reload (if nodemon is installed):
   ```bash
   npx nodemon index.js
   ```

3. **Server will start on:**
   ```
   http://127.0.0.1:3000
   ```

---

## Quick API Testing (using curl)

### 1. Sign Up a New User
```bash
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1234",
    "password": "testpass123",
    "firstName": "John",
    "dob": "1990-05-15"
  }'
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "user": { ... },
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Save the `jwt` token for next requests!

---

### 2. Login
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1234",
    "password": "testpass123"
  }'
```

---

### 3. Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Laptop",
    "quantity": 5,
    "category": "Electronics"
  }'
```

**Note:** Replace `YOUR_JWT_TOKEN` with the actual token from signup/login

---

### 4. Get Your Products
```bash
curl -X GET http://localhost:3000/products/my/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Response shows products with auto-calculated status.

---

### 5. See Status in Action

Create products with different quantities:

**Product 1: Available (quantity = 5)**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Monitor",
    "quantity": 5,
    "category": "Electronics"
  }'
```
→ Status: `"available"` (5 > 2)

**Product 2: Low Stock (quantity = 2)**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Keyboard",
    "quantity": 2,
    "category": "Peripherals"
  }'
```
→ Status: `"low stock"` (0 < 2 ≤ 2)

**Product 3: Out of Stock (quantity = 0)**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Mouse",
    "quantity": 0,
    "category": "Peripherals"
  }'
```
→ Status: `"out of stock"` (0)

---

### 6. Update Product Stock

Get the product ID from previous responses, then:

**Restock (add 3 items):**
```bash
curl -X PATCH http://localhost:3000/products/PRODUCT_ID/stock \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "operation": "restock",
    "quantity": 3
  }'
```

**Destock (remove 2 items):**
```bash
curl -X PATCH http://localhost:3000/products/PRODUCT_ID/stock \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "operation": "destock",
    "quantity": 2
  }'
```

---

### 7. View All Products with Status Filter
```bash
# Get all available products
curl -X GET "http://localhost:3000/products?status=available"

# Get all low stock products
curl -X GET "http://localhost:3000/products?status=low%20stock"

# Get all out of stock products
curl -X GET "http://localhost:3000/products?status=out%20of%20stock"
```

---

### 8. Update Product Details
```bash
curl -X PATCH http://localhost:3000/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Gaming Laptop",
    "category": "High-End Electronics"
  }'
```

---

### 9. Delete a Product
```bash
curl -X DELETE http://localhost:3000/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Status Logic Quick Reference

| Quantity | Status | Color |
|----------|--------|-------|
| > 2 | available | 🟢 Green |
| 0 < qty ≤ 2 | low stock | 🟡 Yellow |
| = 0 | out of stock | 🔴 Red |

Status automatically updates when quantity changes!

---

## API Key Points

✅ **Authentication:** Use JWT token in `Authorization: Bearer <token>` header  
✅ **Protected Routes:** Create, update, delete products require authentication  
✅ **Ownership:** Users can only access/modify their own products  
✅ **Status:** Auto-calculated based on quantity  
✅ **Username:** Must be alphanumeric, 8-50 characters, unique  
✅ **Password:** 8-50 characters, hashed with bcrypt  
✅ **Product Names:** Must be unique per user  

---

## Troubleshooting

### MongoDB Connection Error
```
Cannot Connect to DB
```
**Solution:** Make sure MongoDB is running:
```bash
mongod
```

Or check the connection string in `index.js`

---

### Authentication Errors
```json
{
  "error": "Authentication token is required"
}
```
**Solution:** Include the JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### Validation Errors
```json
{
  "error": "Validation failed",
  "details": [...]
}
```
**Solution:** Check field requirements in [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

### Product Name Duplicate Error
```json
{
  "error": "Product name already exists for this user"
}
```
**Solution:** Use a different product name. Names must be unique per user, not globally.

---

## Project Structure

```
Lab_5/
├── index.js                 # Express app entry point
├── models/
│   ├── users.js            # User schema & model
│   └── products.js         # Product schema & model
├── controllers/
│   ├── users.js            # User business logic
│   ├── products.js         # Product business logic
│   └── index.js            # Export controllers
├── routers/
│   ├── users.js            # User routes
│   ├── products.js         # Product routes
│   └── index.js            # Export routers
├── middlewares/
│   ├── auth.js             # JWT authentication
│   ├── validation.js       # Validation helper
│   ├── userValidation.js   # User schema validation
│   ├── productValidation.js # Product schema validation
│   └── index.js            # Export middlewares
├── package.json            # Dependencies
├── API_DOCUMENTATION.md    # Full API reference
└── IMPLEMENTATION_SUMMARY.md # Technical details
```

---

## Environment Configuration

Default values (can be overridden with environment variables):
- `PORT`: 3000
- `JWT_SECRET`: 'hjfytfsayr57623er623dfsss3d6723ert623dr'
- `MongoDB`: 'mongodb://127.0.0.1:27017/inventory'

To use environment variables:
```bash
export PORT=3001
export JWT_SECRET="your-secret-key"
npm start
```

---

## Testing with Postman/Insomnia

Import these settings:

**Base URL:** `http://localhost:3000`

**Headers (for protected routes):**
```
Authorization: Bearer <token>
Content-Type: application/json
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for all endpoint details!

---

## Features Implemented ✅

- [x] User signup with secure password hashing
- [x] User login with JWT authentication
- [x] User profile management
- [x] Product CRUD operations
- [x] Automatic inventory status calculation
- [x] Stock management (restock/destock)
- [x] Input validation with Joi
- [x] Authorization checks (user ownership)
- [x] Error handling with appropriate HTTP status codes
- [x] MongoDB data persistence
- [x] Product filtering by status and pagination
- [x] Complete API documentation

---

