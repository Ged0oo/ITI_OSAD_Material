# REST APIs & Node.js — A Comprehensive Guide with Demos

---

## 📑 Table of Contents

1. [What is a REST API?](#what-is-a-rest-api)
2. [REST Principles](#rest-principles)
3. [HTTP Methods](#http-methods)
4. [HTTP Status Codes](#http-status-codes)
5. [Setting Up a Node.js Project](#setting-up-a-nodejs-project)
6. [Demo 1: Simple HTTP Server (No Framework)](#demo-1-simple-http-server-no-framework)
7. [Demo 2: Express.js CRUD API](#demo-2-expressjs-crud-api)
8. [Demo 3: Middleware & Error Handling](#demo-3-middleware--error-handling)
9. [Demo 4: Router & Modular Structure](#demo-4-router--modular-structure)
10. [Demo 5: MongoDB Integration (Mongoose)](#demo-5-mongodb-integration-mongoose)
11. [Demo 6: Authentication with JWT](#demo-6-authentication-with-jwt)
12. [Demo 7: Input Validation](#demo-7-input-validation)
13. [Demo 8: Pagination, Filtering & Sorting](#demo-8-pagination-filtering--sorting)
14. [Demo 9: File Upload API](#demo-9-file-upload-api)
15. [Demo 10: Rate Limiting & Security Best Practices](#demo-10-rate-limiting--security-best-practices)
16. [Testing REST APIs](#testing-rest-apis)
17. [Project Structure Best Practices](#project-structure-best-practices)
18. [Useful Resources](#useful-resources)

---

## What is a REST API?

**REST** stands for **RE**presentational **S**tate **T**ransfer. It is an **architectural style** for designing networked applications. A **REST API** (also called a RESTful API) is an interface that two computer systems use to exchange information securely over the internet using **HTTP**.

### Key Concepts

| Concept        | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Resource**   | Any object the API can provide information about (e.g., Users, Products).  |
| **Endpoint**   | The URL where a resource can be accessed (e.g., `/api/users`).             |
| **Request**    | What the client sends (method + URL + headers + body).                     |
| **Response**   | What the server returns (status code + headers + body).                    |

### Example

```
Client  ──GET /api/users──▶  Server
Client  ◀──200 OK + JSON────  Server
```

---

## REST Principles

REST APIs follow **six guiding constraints**:

### 1. Client-Server Architecture
> The client (frontend) and the server (backend) are **separated**. Each can evolve independently.

### 2. Statelessness
> Each request from the client must contain **all the information** the server needs. The server doesn't store session state.

### 3. Cacheability
> Responses must define themselves as **cacheable or non-cacheable** to improve client-side performance.

### 4. Uniform Interface
> A consistent, standardized way to communicate:
> - Resource identification via URIs
> - Manipulation through representations (JSON, XML)
> - Self-descriptive messages
> - HATEOAS (Hypermedia As The Engine Of Application State)

### 5. Layered System
> The architecture can be composed of **multiple layers** (load balancers, proxies, gateways), each unaware of other layers.

### 6. Code on Demand (Optional)
> Servers can send executable code (e.g., JavaScript) to the client.

---

## HTTP Methods

| Method     | CRUD Operation | Description                              | Idempotent | Safe |
|------------|---------------|------------------------------------------|------------|------|
| `GET`      | **Read**       | Retrieve a resource                      | ✅ Yes      | ✅ Yes |
| `POST`     | **Create**     | Create a new resource                    | ❌ No       | ❌ No  |
| `PUT`      | **Update**     | Replace an entire resource               | ✅ Yes      | ❌ No  |
| `PATCH`    | **Update**     | Partially update a resource              | ❌ No       | ❌ No  |
| `DELETE`   | **Delete**     | Remove a resource                        | ✅ Yes      | ❌ No  |

> **Idempotent** = Making the same request multiple times produces the same result.
> **Safe** = The request doesn't modify server state.

### URL Design Best Practices

```
✅ GET    /api/users          → Get all users
✅ GET    /api/users/123      → Get user with id 123
✅ POST   /api/users          → Create a new user
✅ PUT    /api/users/123      → Update user 123 (full)
✅ PATCH  /api/users/123      → Update user 123 (partial)
✅ DELETE /api/users/123      → Delete user 123

❌ GET    /api/getUsers       → Don't use verbs in URLs
❌ POST   /api/createUser     → Don't use verbs in URLs
❌ GET    /api/User           → Use plural nouns
```

---

## HTTP Status Codes

### Categorization

| Range   | Category          | Description                        |
|---------|-------------------|------------------------------------|
| `1xx`   | Informational     | Request received, continuing       |
| `2xx`   | Success           | Request was successful             |
| `3xx`   | Redirection       | Further action needed              |
| `4xx`   | Client Error      | Bad request from the client        |
| `5xx`   | Server Error      | Server failed to fulfill request   |

### Common Codes

```
200 OK                    → Successful GET/PUT/PATCH
201 Created               → Successful POST (resource created)
204 No Content            → Successful DELETE (nothing to return)
400 Bad Request           → Invalid input / validation error
401 Unauthorized          → Missing or invalid authentication
403 Forbidden             → Authenticated but not authorized
404 Not Found             → Resource doesn't exist
409 Conflict              → Duplicate resource
422 Unprocessable Entity  → Validation failure
429 Too Many Requests     → Rate limit exceeded
500 Internal Server Error → Unexpected server error
```

---

## Setting Up a Node.js Project

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn
- A code editor (VS Code recommended)
- Postman or cURL for testing

### Initialize Project

```bash
# Create project directory
mkdir rest-api-demo && cd rest-api-demo

# Initialize package.json
npm init -y

# Install dependencies
npm install express mongoose dotenv cors helmet morgan jsonwebtoken bcryptjs express-validator multer express-rate-limit

# Install dev dependencies
npm install -D nodemon
```

### Update `package.json` scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## Demo 1: Simple HTTP Server (No Framework)

> This shows how REST APIs work at the lowest level using Node.js built-in `http` module.

### `server-basic.js`

```javascript
/**
 * Demo 1: Pure Node.js HTTP Server
 * No external frameworks — just the built-in 'http' module.
 * This demonstrates the fundamentals of handling HTTP requests.
 */

const http = require('http');

// In-memory "database"
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build REST API', completed: false },
];
let nextId = 3;

/**
 * Helper: Parse the JSON body from an incoming request.
 * Node.js receives data in chunks, so we collect them and parse at the end.
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString(); // Convert buffer to string
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Helper: Send a JSON response.
 */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

/**
 * Main request handler.
 * We manually route based on req.method and req.url.
 */
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // --- GET /api/todos ---
  // Returns all todos
  if (method === 'GET' && url === '/api/todos') {
    return sendJSON(res, 200, {
      success: true,
      count: todos.length,
      data: todos,
    });
  }

  // --- GET /api/todos/:id ---
  // Returns a single todo by ID
  const matchGet = url.match(/^\/api\/todos\/(\d+)$/);
  if (method === 'GET' && matchGet) {
    const id = parseInt(matchGet[1]);
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return sendJSON(res, 404, { success: false, error: 'Todo not found' });
    }
    return sendJSON(res, 200, { success: true, data: todo });
  }

  // --- POST /api/todos ---
  // Creates a new todo
  if (method === 'POST' && url === '/api/todos') {
    try {
      const { title } = await parseBody(req);

      if (!title) {
        return sendJSON(res, 400, {
          success: false,
          error: 'Title is required',
        });
      }

      const newTodo = { id: nextId++, title, completed: false };
      todos.push(newTodo);

      return sendJSON(res, 201, { success: true, data: newTodo });
    } catch (err) {
      return sendJSON(res, 400, {
        success: false,
        error: 'Invalid JSON body',
      });
    }
  }

  // --- PUT /api/todos/:id ---
  // Full update of a todo
  const matchPut = url.match(/^\/api\/todos\/(\d+)$/);
  if (method === 'PUT' && matchPut) {
    const id = parseInt(matchPut[1]);
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return sendJSON(res, 404, { success: false, error: 'Todo not found' });
    }

    try {
      const { title, completed } = await parseBody(req);
      todos[index] = { id, title, completed: Boolean(completed) };
      return sendJSON(res, 200, { success: true, data: todos[index] });
    } catch {
      return sendJSON(res, 400, { success: false, error: 'Invalid JSON' });
    }
  }

  // --- DELETE /api/todos/:id ---
  // Deletes a todo
  const matchDel = url.match(/^\/api\/todos\/(\d+)$/);
  if (method === 'DELETE' && matchDel) {
    const id = parseInt(matchDel[1]);
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return sendJSON(res, 404, { success: false, error: 'Todo not found' });
    }

    todos.splice(index, 1);
    return sendJSON(res, 204, null); // 204 = No Content
  }

  // --- 404 for everything else ---
  sendJSON(res, 404, { success: false, error: 'Route not found' });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
```

### Testing with cURL

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Get single todo
curl http://localhost:3000/api/todos/1

# Create a todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Read documentation"}'

# Update a todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "completed": true}'

# Delete a todo
curl -X DELETE http://localhost:3000/api/todos/1
```

---

## Demo 2: Express.js CRUD API

> Express.js is the most popular Node.js web framework. It simplifies routing, middleware, and request/response handling.

### `server.js`

```javascript
/**
 * Demo 2: Express.js CRUD REST API
 * Express abstracts away the manual routing we did in Demo 1.
 */

const express = require('express');
const app = express();

// ----- MIDDLEWARE -----

/**
 * express.json() parses incoming requests with JSON payloads.
 * Without this, req.body would be undefined.
 */
app.use(express.json());

/**
 * A simple custom logger middleware.
 * Middleware functions have access to (req, res, next).
 * They MUST call next() to pass control to the next middleware.
 */
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ----- IN-MEMORY DATABASE -----

let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
  { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas', year: 1999 },
  { id: 3, title: 'Design Patterns', author: 'Gang of Four', year: 1994 },
];
let nextId = 4;

// ----- ROUTES -----

/**
 * GET /api/books
 * Retrieves all books.
 */
app.get('/api/books', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

/**
 * GET /api/books/:id
 * Retrieves a single book by its ID.
 * :id is a route parameter, accessible via req.params.id
 */
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      error: `Book with id ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: book });
});

/**
 * POST /api/books
 * Creates a new book.
 * The client sends data in the request body (JSON).
 */
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  // Basic validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      error: 'Please provide title and author',
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    year: year || null,
  };

  books.push(newBook);

  // 201 = Created
  res.status(201).json({ success: true, data: newBook });
});

/**
 * PUT /api/books/:id
 * Full update — replaces the entire resource.
 */
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Book with id ${id} not found`,
    });
  }

  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      error: 'Please provide title and author',
    });
  }

  books[index] = { id, title, author, year: year || null };

  res.status(200).json({ success: true, data: books[index] });
});

/**
 * PATCH /api/books/:id
 * Partial update — only updates fields that are provided.
 */
app.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      error: `Book with id ${id} not found`,
    });
  }

  // Only overwrite fields that exist in req.body
  const { title, author, year } = req.body;
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (year !== undefined) book.year = year;

  res.status(200).json({ success: true, data: book });
});

/**
 * DELETE /api/books/:id
 * Removes a book from the array.
 */
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Book with id ${id} not found`,
    });
  }

  const deleted = books.splice(index, 1);

  res.status(200).json({ success: true, data: deleted[0] });
});

// ----- START SERVER -----

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📚 Books API running on http://localhost:${PORT}`);
});
```

---

## Demo 3: Middleware & Error Handling

> Middleware is the backbone of Express. Understanding it is critical.

### How Middleware Works

```
Request ──▶ [Middleware 1] ──▶ [Middleware 2] ──▶ [Route Handler] ──▶ Response
               │                    │                    │
             next()              next()            res.send()
```

### `middleware-demo.js`

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// ----- MIDDLEWARE EXAMPLES -----

/**
 * 1. Application-level Middleware
 * Runs on EVERY request.
 */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`⏰ Request Time: ${req.requestTime}`);
  next(); // MUST call next() or the request hangs!
});

/**
 * 2. CORS Middleware (manual implementation)
 * Sets headers to allow cross-origin requests.
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

/**
 * 3. Authentication Middleware
 * Can be applied globally or to specific routes.
 */
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token || token !== 'Bearer mysecrettoken') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing token',
    });
  }

  req.user = { id: 1, name: 'John Doe' }; // Attach user to request
  next();
}

/**
 * 4. Role-based Authorization Middleware
 * A factory function that returns middleware.
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: Insufficient permissions',
      });
    }
    next();
  };
}

// ----- ROUTES -----

// Public route (no auth required)
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public endpoint', time: req.requestTime });
});

// Protected route (auth middleware applied to THIS route only)
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is protected', user: req.user });
});

// ----- ASYNC ERROR WRAPPER -----

/**
 * Wraps async route handlers so we don't need try/catch everywhere.
 * Any error thrown inside the async function is caught and forwarded to
 * the error-handling middleware via next(err).
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Example async route using the wrapper
app.get(
  '/api/async-demo',
  asyncHandler(async (req, res) => {
    // Simulate an async operation that might fail
    const data = await someAsyncOperation();
    res.json({ success: true, data });
  })
);

async function someAsyncOperation() {
  // Simulating async work
  return { message: 'Async data loaded!' };
}

// ----- CUSTOM ERROR CLASS -----

/**
 * Custom error class with a status code.
 * Allows us to throw descriptive errors from anywhere.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguishes from programming errors
  }
}

// Route that deliberately throws a custom error
app.get('/api/error-demo', (req, res, next) => {
  next(new AppError('This is a custom error', 400));
});

// ----- GLOBAL ERROR HANDLING MIDDLEWARE -----

/**
 * Express recognizes error-handling middleware by its 4 parameters:
 * (err, req, res, next)
 * 
 * This MUST be defined AFTER all routes.
 */
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ----- 404 HANDLER -----
// Must be AFTER all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

app.listen(3000, () => console.log('🚀 Server on port 3000'));
```

---

## Demo 4: Router & Modular Structure

> For real-world apps, separate routes, controllers, and logic into different files.

### File Structure

```
project/
├── server.js              # Entry point
├── config/
│   └── db.js              # Database connection
├── routes/
│   ├── userRoutes.js       # User route definitions
│   └── productRoutes.js    # Product route definitions
├── controllers/
│   ├── userController.js   # User business logic
│   └── productController.js
├── models/
│   ├── User.js             # Mongoose schema/model
│   └── Product.js
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── errorHandler.js     # Global error handler
└── utils/
    └── AppError.js         # Custom error class
```

### `routes/userRoutes.js`

```javascript
/**
 * Express Router allows us to define routes in separate files
 * and mount them in the main app.
 */

const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Chain methods on the same path
router
  .route('/')
  .get(getUsers)          // GET    /api/users
  .post(authenticate, createUser);  // POST   /api/users (protected)

router
  .route('/:id')
  .get(getUser)           // GET    /api/users/:id
  .put(authenticate, updateUser)    // PUT    /api/users/:id
  .delete(authenticate, deleteUser); // DELETE /api/users/:id

module.exports = router;
```

### `controllers/userController.js`

```javascript
/**
 * Controllers contain the business logic for each route.
 * They receive (req, res, next) and call the appropriate model methods.
 */

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];
let nextId = 3;

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = (req, res) => {
  res.status(200).json({ success: true, count: users.length, data: users });
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  res.status(200).json({ success: true, data: user });
};

// @desc    Create user
// @route   POST /api/users
// @access  Private
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email required' });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  users[index] = { ...users[index], ...req.body };
  res.status(200).json({ success: true, data: users[index] });
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  const deleted = users.splice(index, 1);
  res.status(200).json({ success: true, data: deleted[0] });
};
```

### `server.js` (mounting routers)

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Import route files
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Mount routers — all routes in userRoutes will be prefixed with /api/users
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Demo 5: MongoDB Integration (Mongoose)

### `config/db.js`

```javascript
const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 * mongoose.connect() returns a promise.
 * We use async/await for cleaner syntax.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options prevent deprecation warnings
      // (most are default in Mongoose 7+)
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
```

### `models/Product.js`

```javascript
const mongoose = require('mongoose');

/**
 * Mongoose Schema defines the structure of documents
 * in a MongoDB collection.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],  // Custom error message
      trim: true,                                       // Remove whitespace
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 chars'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ['electronics', 'clothing', 'books', 'food'],
        message: '{VALUE} is not a valid category',
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Reference to another model
      ref: 'User',                           // The model to reference
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create an index for faster queries
productSchema.index({ name: 'text', description: 'text' });

/**
 * Pre-save middleware (hook).
 * Runs before every .save() call.
 */
productSchema.pre('save', function (next) {
  console.log(`Saving product: ${this.name}`);
  next();
});

/**
 * Instance method — available on individual documents.
 */
productSchema.methods.getInfo = function () {
  return `${this.name} - $${this.price}`;
};

/**
 * Static method — available on the Model itself.
 */
productSchema.statics.findByCategory = function (category) {
  return this.find({ category });
};

// Export the model. Mongoose will create/use a 'products' collection.
module.exports = mongoose.model('Product', productSchema);
```

### `controllers/productController.js` (with MongoDB)

```javascript
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email');
    //                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                         Populate replaces the ObjectId with actual user data.
    //                         Second arg selects which fields to include.

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    // Handle invalid ObjectId format
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format',
      });
    }
    next(err);
  }
};

// @desc    Create product
// @route   POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    // Attach the authenticated user's ID
    req.body.createdBy = req.user.id;

    const product = await Product.create(req.body);
    //              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //  .create() is shorthand for new Product(data).save()
    //  It also triggers validation defined in the schema.

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages });
    }
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // Return the UPDATED document (not the old one)
        runValidators: true, // Run schema validators on update
      }
    );

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
```

---

## Demo 6: Authentication with JWT

### Flow Diagram

```
┌──────────┐    POST /api/auth/register     ┌──────────┐
│  Client  │ ─────────────────────────────▶ │  Server  │
│          │ ◀───── 201 + JWT Token ─────── │          │
│          │                                 │          │
│          │    POST /api/auth/login          │          │
│          │ ─────────────────────────────▶ │          │
│          │ ◀───── 200 + JWT Token ─────── │          │
│          │                                 │          │
│          │  GET /api/protected              │          │
│          │  Header: Authorization:         │          │
│          │    Bearer <token>               │          │
│          │ ─────────────────────────────▶ │          │
│          │ ◀───── 200 + Protected Data ── │          │
└──────────┘                                 └──────────┘
```

### `models/User.js`

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,          // Creates a unique index
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,         // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Pre-save hook to hash the password before saving.
 * Only runs if password was modified (not on every save).
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // Generate salt (randomness factor) and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Instance method: Compare entered password with hashed password in DB.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Instance method: Generate a signed JWT.
 */
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },   // Payload
    process.env.JWT_SECRET,                // Secret key
    { expiresIn: process.env.JWT_EXPIRE || '30d' }  // Options
  );
};

module.exports = mongoose.model('User', userSchema);
```

### `controllers/authController.js`

```javascript
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'Email already in use' });
    }

    // Create user (password is hashed in the pre-save hook)
    const user = await User.create({ name, email, password });

    // Generate token and send response
    const token = user.generateToken();

    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      });
    }

    // Find user and explicitly include the password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = user.generateToken();

    res.status(200).json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  // req.user is set by the auth middleware
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};
```

### `middleware/auth.js`

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes — ensures the user is authenticated.
 * Reads the JWT from the Authorization header.
 */
exports.protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    //                                       ^^^
    //  "Bearer eyJhbGciOi..." → split by space → ["Bearer", "eyJhbGciOi..."]
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //  If invalid or expired, this throws an error.

    // Attach the user to the request object
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User no longer exists',
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Token is invalid or expired',
    });
  }
};

/**
 * Authorize by role.
 * Must be used AFTER the protect middleware (needs req.user).
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Role '${req.user.role}' is not authorized`,
      });
    }
    next();
  };
};
```

### `.env`

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/rest-api-demo
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=30d
```

---

## Demo 7: Input Validation

> Using `express-validator` for robust server-side validation.

```javascript
const { body, param, validationResult } = require('express-validator');

/**
 * Validation rules are middleware arrays.
 * They run checks on req.body, req.params, req.query, etc.
 */

// Validation rules for creating a product
exports.createProductValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['electronics', 'clothing', 'books', 'food'])
    .withMessage('Invalid category'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('website')
    .optional()
    .isURL().withMessage('Invalid URL format'),
];

// Validation for route params
exports.idParamValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
];

/**
 * Middleware to check for validation errors.
 * Place this AFTER the validation rules.
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }

  next();
};
```

### Usage in routes

```javascript
const { createProductValidation, idParamValidation, validate } = require('../middleware/validation');

router.post(
  '/',
  createProductValidation,  // Run checks
  validate,                 // Return errors if any
  productController.createProduct   // Actual handler
);

router.get(
  '/:id',
  idParamValidation,
  validate,
  productController.getProduct
);
```

---

## Demo 8: Pagination, Filtering & Sorting

```javascript
/**
 * Advanced query features for GET /api/products
 * Supports: filtering, sorting, field selection, pagination
 *
 * Examples:
 *   GET /api/products?price[gte]=10&price[lte]=100
 *   GET /api/products?category=electronics&sort=-price
 *   GET /api/products?select=name,price&page=2&limit=10
 */

exports.getProducts = async (req, res, next) => {
  try {
    // ---- 1. FILTERING ----
    let queryObj = { ...req.query };

    // Fields to exclude from filtering (they're not DB fields)
    const excludeFields = ['page', 'sort', 'limit', 'select'];
    excludeFields.forEach((field) => delete queryObj[field]);

    // Convert comparison operators: { price: { gte: '10' } }
    // MongoDB needs: { price: { $gte: 10 } }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    let query = Product.find(JSON.parse(queryStr));

    // ---- 2. SORTING ----
    if (req.query.sort) {
      // Client sends: sort=price,-name
      // Mongoose needs: "price -name"
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default: newest first
    }

    // ---- 3. FIELD SELECTION (Projection) ----
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // ---- 4. PAGINATION ----
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const products = await query;
    const total = await Product.countDocuments(JSON.parse(queryStr));

    // Pagination metadata
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
    };

    if (page < pagination.totalPages) {
      pagination.nextPage = page + 1;
    }
    if (page > 1) {
      pagination.prevPage = page - 1;
    }

    res.status(200).json({
      success: true,
      count: products.length,
      pagination,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
```

---

## Demo 9: File Upload API

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

/**
 * Multer configuration for file uploads.
 * We define WHERE and HOW files are stored.
 */
const storage = multer.diskStorage({
  // Destination folder
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Filename format: fieldname-timestamp.ext
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

/**
 * File filter — only allow certain file types.
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);    // Accept file
  } else {
    cb(new Error('Only images (jpeg, jpg, png, gif) and PDFs are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max
  },
});

// ---- Single file upload ----
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.status(200).json({
    success: true,
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
    },
  });
});

// ---- Multiple file upload (max 5) ----
router.post('/upload-multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, error: 'No files uploaded' });
  }

  const fileDetails = req.files.map((f) => ({
    filename: f.filename,
    originalName: f.originalname,
    size: f.size,
  }));

  res.status(200).json({ success: true, count: req.files.length, data: fileDetails });
});

// Handle multer errors
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, error: 'File too large. Max 5MB.' });
    }
    return res.status(400).json({ success: false, error: err.message });
  }
  next(err);
});

module.exports = router;
```

---

## Demo 10: Rate Limiting & Security Best Practices

```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();

// ---- SECURITY MIDDLEWARE ----

/**
 * Helmet: Sets various HTTP headers for security.
 * - X-Content-Type-Options: nosniff
 * - X-Frame-Options: DENY
 * - Strict-Transport-Security (HSTS)
 * - And more...
 */
app.use(helmet());

/**
 * CORS: Configure Cross-Origin Resource Sharing.
 * Controls which domains can call your API.
 */
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourfrontend.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies
}));

/**
 * Rate Limiting: Prevent brute-force / DDoS attacks.
 * Limits each IP to a certain number of requests per window.
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                    // 100 requests per window per IP
  message: {
    success: false,
    error: 'Too many requests, please try again after 15 minutes',
  },
  standardHeaders: true,       // Return rate limit info in headers
  legacyHeaders: false,
});
app.use(generalLimiter);

/**
 * Stricter limiter for auth routes (login, register).
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Only 10 login attempts per 15 minutes
  message: {
    success: false,
    error: 'Too many login attempts, try again later',
  },
});
app.use('/api/auth', authLimiter);

/**
 * Morgan: HTTP request logger.
 * 'dev' format: :method :url :status :response-time ms
 */
app.use(morgan('dev'));

/**
 * Body parser with size limit to prevent payload attacks.
 */
app.use(express.json({ limit: '10kb' }));

/**
 * Prevent NoSQL injection by sanitizing input.
 * (In production, use 'express-mongo-sanitize' package)
 */
// app.use(mongoSanitize());

/**
 * Prevent XSS attacks.
 * (In production, use 'xss-clean' package)
 */
// app.use(xss());

/**
 * Prevent HTTP parameter pollution.
 * (In production, use 'hpp' package)
 */
// app.use(hpp());

// ---- ROUTES ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// ... mount your routes here ...

app.listen(3000, () => console.log('🔒 Secure server on port 3000'));
```

---

## Testing REST APIs

### Using cURL

```bash
# GET
curl -X GET http://localhost:3000/api/products

# POST with JSON body
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Laptop","price":999,"category":"electronics"}'

# PUT
curl -X PUT http://localhost:3000/api/products/ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Laptop","price":1099,"category":"electronics"}'

# DELETE
curl -X DELETE http://localhost:3000/api/products/ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Jest + Supertest

```javascript
// __tests__/products.test.js
const request = require('supertest');
const app = require('../server');

describe('Product API', () => {
  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('should create a product when valid data is provided', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Product',
          price: 29.99,
          category: 'electronics',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBe('Test Product');
    });

    it('should return 400 when name is missing', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ price: 29.99 });

      expect(res.statusCode).toBe(400);
    });
  });
});
```

---

## Project Structure Best Practices

```
📁 rest-api-project/
│
├── 📁 config/
│   ├── db.js                # Database connection
│   └── config.env           # Environment variables
│
├── 📁 controllers/          # Route handler logic
│   ├── authController.js
│   ├── userController.js
│   └── productController.js
│
├── 📁 middleware/            # Custom middleware
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Global error handler
│   └── validation.js        # Input validation
│
├── 📁 models/               # Mongoose schemas/models
│   ├── User.js
│   └── Product.js
│
├── 📁 routes/               # Route definitions
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── productRoutes.js
│
├── 📁 utils/                # Utility functions
│   ├── AppError.js          # Custom error class
│   └── sendEmail.js         # Email helper
│
├── 📁 uploads/              # Uploaded files
├── 📁 __tests__/            # Test files
│
├── .env                     # Environment variables (NEVER commit this!)
├── .gitignore
├── package.json
├── server.js                # Entry point
└── README.md
```

---

## Useful Resources

| Resource                          | Link                                           |
|-----------------------------------|-------------------------------------------------|
| Express.js Documentation          | https://expressjs.com/                          |
| Mongoose Documentation            | https://mongoosejs.com/docs/                    |
| HTTP Status Codes Reference       | https://httpstatuses.com/                       |
| REST API Design Best Practices    | https://restfulapi.net/                         |
| JWT.io (Debugger & Docs)          | https://jwt.io/                                 |
| Node.js Best Practices            | https://github.com/goldbergyoni/nodebestpractices |
| Postman (API Testing Tool)        | https://www.postman.com/                        |

---

## Quick Reference: Express Cheat Sheet

```javascript
// Initialization
const express = require('express');
const app = express();

// Middleware
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public'));          // Serve static files

// Routes
app.get('/path', handler);                  // GET
app.post('/path', handler);                 // POST
app.put('/path/:id', handler);              // PUT
app.patch('/path/:id', handler);            // PATCH
app.delete('/path/:id', handler);           // DELETE

// Route parameters: req.params.id
// Query strings:    req.query.page    (?page=1)
// Request body:     req.body.name
// Request headers:  req.headers.authorization

// Response methods
res.status(200).json({ data });             // Send JSON
res.status(201).send('Created');            // Send text
res.status(204).end();                      // No content
res.redirect('/new-url');                   // Redirect

// Start server
app.listen(3000, () => console.log('Running'));
```

---

> **⚡ Tip:** Start with Demo 1 to understand the fundamentals, then progressively build up to the more advanced demos. Each demo builds upon concepts from the previous ones.
