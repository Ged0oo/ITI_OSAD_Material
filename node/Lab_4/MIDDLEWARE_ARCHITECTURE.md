# Middleware Layer Architecture

## Overview
The validation logic has been refactored into a dedicated middleware layer, following the separation of concerns principle. This creates a clean, maintainable architecture with clear separation between routes, middleware, and business logic.

## Directory Structure

```
middlewares/
├── index.js                 # Central middleware exports
├── validation.js           # Core validation middleware
├── userValidation.js       # User-specific validation middleware
└── productValidation.js    # Product-specific validation middleware

utils/
└── validations.js          # Joi schemas (data validation rules only)

routers/
├── users.js               # User routes (clean, middleware-based)
└── products.js            # Product routes (clean, middleware-based)

controllers/
├── users.js              # User business logic
└── products.js           # Product business logic
```

## Middleware Layer Components

### 1. **validation.js** - Core Validation Middleware
Generic, reusable validation middleware for all validation needs.

**Exports:**
- `validate(schema, property)` - Generic validation middleware factory
- `validateMongoId` - MongoDB ObjectId format validation middleware

**Usage:**
```javascript
const { validate, validateMongoId } = require('../middlewares/validation');
```

### 2. **userValidation.js** - User-Specific Middleware
Pre-configured middleware specific to user operations.

**Exports:**
- `validateUserCreation` - Validates user creation requests
- `validateUserUpdate` - Validates user update requests

**Usage:**
```javascript
const { validateUserCreation, validateUserUpdate } = require('../middlewares/userValidation');
```

### 3. **productValidation.js** - Product-Specific Middleware
Pre-configured middleware specific to product operations.

**Exports:**
- `validateProductCreation` - Validates product creation requests
- `validateProductUpdate` - Validates product update requests
- `validateStockUpdate` - Validates stock operation requests

**Usage:**
```javascript
const { validateProductCreation, validateProductUpdate, validateStockUpdate } = require('../middlewares/productValidation');
```

### 4. **index.js** - Centralized Middleware Exports
Single entry point for all middleware (optional but recommended).

**Usage:**
```javascript
const { validateUserCreation, validateMongoId, validateStockUpdate } = require('../middlewares');
```

## Validation Schemas

All validation schemas are stored in `utils/validations.js` and contain:

### User Schemas
- `userCreationSchema` - Username, firstName, lastName, dob validation
- `userUpdateSchema` - Optional fields for user updates

### Product Schemas
- `productCreationSchema` - Owner, name, quantity, categories validation
- `productUpdateSchema` - Optional fields for product updates
- `stockUpdateSchema` - Operation and quantity validation

## Request Flow Diagram

```
HTTP Request
    ↓
Route Handler
    ↓
Middleware Layer (Sequential)
    ├── Generic Middleware (e.g., validateMongoId)
    ├── Specific Middleware (e.g., validateUserCreation)
    └── Next if all pass, or Error Response
    ↓
Route Handler Function
    ↓
Controller Logic
    ↓
Database Operations
    ↓
Response
```

## Route Examples

### Before (Inline Validation)
```javascript
router.delete('/:id', async (req, res) => {
    try {
        const { error } = mongoIdSchema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        
        const result = await usersController.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})
```

### After (Middleware-Based)
```javascript
router.delete('/:id', validateMongoId, async (req, res) => {
    try {
        const result = await usersController.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})
```

## Benefits of Middleware Separation

✅ **Clean Routes** - Route handlers focus only on business logic
✅ **Reusability** - Middleware can be shared across routes
✅ **Maintainability** - Validation logic is centralized
✅ **Testability** - Middleware can be tested independently
✅ **Consistency** - Standardized error responses across all validations
✅ **Scalability** - Easy to add new validation middleware
✅ **Readability** - Route definitions are concise and self-documenting
✅ **DRY Principle** - No validation code duplication

## Validation Execution Order

When a request hits a route with multiple middleware:

```
router.patch('/:id', validateMongoId, validateUserUpdate, async (req, res) => { ... })
```

Execution order:
1. `validateMongoId` - Validates route parameter `:id` format
2. `validateUserUpdate` - Validates request body
3. Route handler - If both middleware pass

If any middleware fails, error response is sent immediately and subsequent middleware/handler is not executed.

## Creating New Middleware

To create a new validation middleware:

**Step 1:** Create the schema in `utils/validations.js`
```javascript
const newSchema = Joi.object({
  field: Joi.string().required()
});
```

**Step 2:** Create or update middleware file
```javascript
// middlewares/newValidation.js
const { validate } = require('./validation');
const { newSchema } = require('../utils/validations');

const validateNewResource = validate(newSchema, 'body');

module.exports = { validateNewResource };
```

**Step 3:** Use in routes
```javascript
const { validateNewResource } = require('../middlewares/newValidation');

router.post('/', validateNewResource, async (req, res) => {
  // Handle request
});
```

## Error Handling

All validation errors follow a consistent format:

**Validation Failure (400):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "username",
      "message": "Username must be at least 8 characters long"
    },
    {
      "field": "firstName",
      "message": "First name is required"
    }
  ]
}
```

**Invalid ID Format (400):**
```json
{
  "error": "Invalid ID format. Must be a valid MongoDB ObjectId."
}
```

## Testing Middleware

### Using cURL

**Create User (passes validation):**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "validuser123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Create User (fails validation):**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "short",
    "firstName": "Jo"
  }'
```

**Invalid ID (fails middleware):**
```bash
curl -X DELETE http://localhost:3000/users/invalid-id
```

## Middleware Composition

For complex scenarios, middleware can be composed:

```javascript
// Single middleware
router.delete('/:id', validateMongoId, handler);

// Multiple middleware (chained execution)
router.patch('/:id', validateMongoId, validateUserUpdate, handler);

// Custom middleware chain
const userUpdateChain = [validateMongoId, validateUserUpdate];
router.patch('/:id', ...userUpdateChain, handler);
```

## Summary

The middleware layer architecture provides:
- **Separation of Concerns** - Each layer has a single responsibility
- **Code Organization** - Clear folder structure and imports
- **Maintainability** - Changes to validation logic are centralized
- **Extensibility** - Easy to add new validation middleware
- **Consistency** - Standardized error handling and responses
