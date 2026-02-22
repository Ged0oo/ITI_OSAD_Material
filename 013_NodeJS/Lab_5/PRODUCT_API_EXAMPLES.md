# Product API Examples

## Create Product (POST /products)

### Successful Request Example

**Request:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iphone17",
  "quantity": 1,
  "status": "Instock",
  "categories": ["Phone", "Electronics"]
}'
```

**Request Body:**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iphone17",
  "quantity": 1,
  "status": "Instock",
  "categories": ["Phone", "Electronics"]
}
```

**HTTP Status:** `201 Created`

**Response (Success):**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "owner": "698f8a8e82b32793877bbc67",
    "name": "iphone17",
    "quantity": 1,
    "status": "Instock",
    "categories": ["Phone", "Electronics"],
    "createdAt": "2026-02-15T10:30:00.000Z",
    "updatedAt": "2026-02-15T10:30:00.000Z",
    "__v": 0
  }
}
```

---

## Validation Error Examples

### Missing Required Field: Status

**Request Body:**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iphone17",
  "quantity": 1,
  "categories": ["Phone"]
}
```

**HTTP Status:** `400 Bad Request`

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "status",
      "message": "Product Status is required"
    }
  ]
}
```

---

### Invalid Status Value

**Request Body:**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iphone17",
  "quantity": 1,
  "status": "BackOrder",
  "categories": ["Phone"]
}
```

**HTTP Status:** `400 Bad Request`

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "status",
      "message": "Status must be one of: Instock, Outofstock, Discontinued"
    }
  ]
}
```

---

### Missing Required Field: Owner

**Request Body:**
```json
{
  "name": "iphone17",
  "quantity": 1,
  "status": "Instock",
  "categories": ["Phone"]
}
```

**HTTP Status:** `400 Bad Request`

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "owner",
      "message": "Owner is required"
    }
  ]
}
```

---

### Invalid Owner Format (Not MongoDB ID)

**Request Body:**
```json
{
  "owner": "invalid-id",
  "name": "iphone17",
  "quantity": 1,
  "status": "Instock",
  "categories": ["Phone"]
}
```

**HTTP Status:** `400 Bad Request`

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "owner",
      "message": "Owner must be a valid MongoDB ID"
    }
  ]
}
```

---

### Product Name Too Short

**Request Body:**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iph",
  "quantity": 1,
  "status": "Instock",
  "categories": ["Phone"]
}
```

**HTTP Status:** `400 Bad Request`

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Product name must be at least 5 characters"
    }
  ]
}
```

---

### Product Name Duplicate (Unique Constraint)

**Request Body (second request with same name):**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iphone17",
  "quantity": 1,
  "status": "Instock",
  "categories": ["Phone"]
}
```

**HTTP Status:** `409 Conflict`

**Response (Error):**
```json
{
  "error": "Product name already exists"
}
```

---

### Invalid Quantity

**Request Body (negative quantity):**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iphone17",
  "quantity": -5,
  "status": "Instock",
  "categories": ["Phone"]
}
```

**HTTP Status:** `400 Bad Request`

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "quantity",
      "message": "Quantity must be at least 1"
    }
  ]
}
```

---

### Multiple Validation Errors

**Request Body:**
```json
{
  "owner": "invalid",
  "name": "ip",
  "quantity": "abc",
  "categories": "Phone"
}
```

**HTTP Status:** `400 Bad Request`

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "owner",
      "message": "Owner must be a valid MongoDB ID"
    },
    {
      "field": "name",
      "message": "Product name must be at least 5 characters"
    },
    {
      "field": "quantity",
      "message": "Quantity must be a number"
    },
    {
      "field": "status",
      "message": "Product Status is required"
    },
    {
      "field": "categories",
      "message": "Categories must be an array"
    }
  ]
}
```

---

## Product Status Options

### Valid Status Values

| Status | Description |
|--------|-------------|
| `Instock` | Product is available in inventory |
| `Outofstock` | Product is out of stock but may be available later |
| `Discontinued` | Product is no longer available |

### Complete Product Schema

**Request Fields:**

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| `owner` | String (MongoDB ID) | Yes | Valid ObjectId format (24 hex chars) | `"698f8a8e82b32793877bbc67"` |
| `name` | String | Yes | 5-20 characters, unique | `"iphone17"` |
| `quantity` | Number | Yes | Integer, minimum 1 | `1` |
| `status` | String | Yes | Instock, Outofstock, Discontinued | `"Instock"` |
| `categories` | Array (String) | No | 0-50 characters per item, default: ["General"] | `["Phone", "Electronics"]` |

---

## Examples with Different Status Values

### Status: Outofstock

**Request:**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "samsungS24",
  "quantity": 0,
  "status": "Outofstock",
  "categories": ["Phone"]
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439013",
    "owner": "698f8a8e82b32793877bbc67",
    "name": "samsungS24",
    "quantity": 0,
    "status": "Outofstock",
    "categories": ["Phone"],
    "createdAt": "2026-02-15T10:35:00.000Z",
    "updatedAt": "2026-02-15T10:35:00.000Z",
    "__v": 0
  }
}
```

---

### Status: Discontinued

**Request:**
```json
{
  "owner": "698f8a8e82b32793877bbc67",
  "name": "iphone6s",
  "quantity": 50,
  "status": "Discontinued",
  "categories": ["Phone"]
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439014",
    "owner": "698f8a8e82b32793877bbc67",
    "name": "iphone6s",
    "quantity": 50,
    "status": "Discontinued",
    "categories": ["Phone"],
    "createdAt": "2026-02-15T10:40:00.000Z",
    "updatedAt": "2026-02-15T10:40:00.000Z",
    "__v": 0
  }
}
```

---

## Update Product (PATCH /products/:id)

### Update Product Status

**Request:**
```bash
curl -X PATCH http://localhost:3000/products/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{
  "status": "Outofstock"
}'
```

**Request Body:**
```json
{
  "status": "Outofstock"
}
```

**Response:**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "owner": "698f8a8e82b32793877bbc67",
    "name": "iphone17",
    "quantity": 1,
    "status": "Outofstock",
    "categories": ["Phone", "Electronics"],
    "createdAt": "2026-02-15T10:30:00.000Z",
    "updatedAt": "2026-02-15T10:45:00.000Z",
    "__v": 0
  }
}
```

---

### Update Multiple Fields

**Request:**
```bash
curl -X PATCH http://localhost:3000/products/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{
  "status": "Instock",
  "categories": ["Phone", "Electronics", "Premium"]
}'
```

**Response:**
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "owner": "698f8a8e82b32793877bbc67",
    "name": "iphone17",
    "quantity": 1,
    "status": "Instock",
    "categories": ["Phone", "Electronics", "Premium"],
    "createdAt": "2026-02-15T10:30:00.000Z",
    "updatedAt": "2026-02-15T10:50:00.000Z",
    "__v": 0
  }
}
```

---

## Stock Management (PATCH /products/:id/stock)

### Restock Product

**Request:**
```bash
curl -X PATCH http://localhost:3000/products/507f1f77bcf86cd799439012/stock \
  -H "Content-Type: application/json" \
  -d '{
  "operation": "restock",
  "quantity": 10
}'
```

**Response:**
```json
{
  "message": "Stock updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "owner": "698f8a8e82b32793877bbc67",
    "name": "iphone17",
    "quantity": 11,
    "status": "Instock",
    "categories": ["Phone", "Electronics"],
    "createdAt": "2026-02-15T10:30:00.000Z",
    "updatedAt": "2026-02-15T10:55:00.000Z",
    "__v": 0
  }
}
```

---

### Destock Product

**Request:**
```bash
curl -X PATCH http://localhost:3000/products/507f1f77bcf86cd799439012/stock \
  -H "Content-Type: application/json" \
  -d '{
  "operation": "destock",
  "quantity": 3
}'
```

**Response:**
```json
{
  "message": "Stock updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "owner": "698f8a8e82b32793877bbc67",
    "name": "iphone17",
    "quantity": 8,
    "status": "Instock",
    "categories": ["Phone", "Electronics"],
    "createdAt": "2026-02-15T10:30:00.000Z",
    "updatedAt": "2026-02-15T11:00:00.000Z",
    "__v": 0
  }
}
```

---

### Destock Error (Insufficient Stock)

**Request (destock more than available):**
```bash
curl -X PATCH http://localhost:3000/products/507f1f77bcf86cd799439012/stock \
  -H "Content-Type: application/json" \
  -d '{
  "operation": "destock",
  "quantity": 20
}'
```

**HTTP Status:** `400 Bad Request`

**Response:**
```json
{
  "error": "Insufficient stock for destock operation"
}
```

---

## Testing Tips

### Using Postman

1. **Create Product:**
   - Method: `POST`
   - URL: `http://localhost:3000/products`
   - Body (JSON):
     ```json
     {
       "owner": "698f8a8e82b32793877bbc67",
       "name": "iphone17",
       "quantity": 1,
       "status": "Instock",
       "categories": ["Phone", "Electronics"]
     }
     ```

2. **Update Product:**
   - Method: `PATCH`
   - URL: `http://localhost:3000/products/{product_id}`
   - Body (JSON):
     ```json
     {
       "status": "Discontinued"
     }
     ```

3. **Update Stock:**
   - Method: `PATCH`
   - URL: `http://localhost:3000/products/{product_id}/stock`
   - Body (JSON):
     ```json
     {
       "operation": "restock",
       "quantity": 5
     }
     ```
