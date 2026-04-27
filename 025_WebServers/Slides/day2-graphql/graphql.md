# GraphQL + Node.js Beginner Guide (Day 0)

<!-- markdownlint-disable MD013 MD033 MD036 -->

> 🎯 **Goal:** Take you from zero knowledge to building your first GraphQL server with Node.js.
>
> 📖 **Reading Time:** ~45 minutes | **Coding Time:** ~1–2 hours

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Project Setup](#3-project-setup)
4. [First GraphQL Server Demo](#4-first-graphql-server-demo)
5. [Understanding Schema](#5-understanding-schema)
6. [First Query Demo](#6-first-query-demo)
7. [Dynamic Data Demo](#7-dynamic-data-demo)
8. [Mutation Demo](#8-mutation-demo)
9. [Connect with Node.js Logic](#9-connect-with-nodejs-logic)
10. [Common Beginner Errors](#10-common-beginner-errors)
11. [Best Practices for Beginners](#11-best-practices-for-beginners)
12. [Mini Practice Tasks](#12-mini-practice-tasks)
13. [Next Step Roadmap](#13-next-step-roadmap)

---

## 1. Introduction

### What is GraphQL?

GraphQL is a **query language for APIs**. It was created by Facebook in 2012 and released publicly in 2015.

Think of it this way:

> 🍔 **Analogy:** Imagine you go to a restaurant. With a traditional menu (REST API), you order a combo meal — you get fries, a burger, and a drink even if you only wanted the burger. With GraphQL, you get a **custom menu** — you ask for _exactly_ what you want, and that's _exactly_ what you get.

GraphQL is **not** a database. It is **not** a programming language. It is a **way to ask for data** from a server.

### Why Was GraphQL Created?

Facebook had a problem:

- Their mobile app was **slow** because it was fetching too much data.
- They needed **multiple API calls** to get data for a single screen.
- Different screens needed **different pieces** of the same data.

GraphQL solved all of these problems by letting the **client (front-end) decide** what data it needs.

### REST API vs GraphQL

| Feature            | REST API                                     | GraphQL                                  |
| ------------------ | -------------------------------------------- | ---------------------------------------- |
| **Endpoints**      | Many (e.g., `/users`, `/posts`, `/comments`) | One (e.g., `/graphql`)                   |
| **Data Fetching**  | Server decides what data to send             | Client decides what data to ask for      |
| **Over-fetching**  | Common (you get extra data you don't need)   | Never (you get exactly what you ask for) |
| **Under-fetching** | Common (you need multiple calls)             | Never (one query can get everything)     |
| **Learning Curve** | Easier to start                              | Slightly more setup, but powerful        |

#### Visual Comparison

```text

REST API Approach:
┌──────────┐ GET /users/1 ┌──────────┐
│ │ ──────────────────────► │ │
│ Client │ GET /users/1/posts │ Server │
│ │ ──────────────────────► │ │
│ │ GET /posts/1/comments│ │
│ │ ──────────────────────► │ │
└──────────┘ (3 separate requests) └──────────┘

GraphQL Approach:
┌──────────┐ POST /graphql ┌──────────┐
│ │ ──────────────────────► │ │
│ Client │ { user, posts, │ Server │
│ │ comments } │ │
│ │ ◄────────────────────── │ │
└──────────┘ (1 single request) └──────────┘

```

### Real-World Use Cases

Companies using GraphQL:

- **Facebook** — Where it was born. Powers the News Feed.
- **GitHub** — Their public API v4 is entirely GraphQL.
- **Shopify** — E-commerce stores query product data with GraphQL.
- **Twitter** — Uses GraphQL for their timeline.
- **Netflix** — Uses GraphQL for internal tooling.

**When should YOU use GraphQL?**

- When your front-end needs flexible data
- When you have many related data types (users, posts, comments)
- When you want to reduce the number of API calls
- When building mobile apps (where bandwidth matters)

---

## 2. Prerequisites

### What You Need

| Tool            | Why You Need It                        | Minimum Version           |
| --------------- | -------------------------------------- | ------------------------- |
| **Node.js**     | Runs JavaScript on your computer       | v14 or higher             |
| **npm**         | Installs packages (comes with Node.js) | v6 or higher              |
| **Code Editor** | Write your code                        | Any (VS Code recommended) |
| **Terminal**    | Run commands                           | Built into your OS        |
| **Web Browser** | Test your GraphQL queries              | Any modern browser        |

### Step 1: Install Node.js

Go to: [https://nodejs.org](https://nodejs.org)

Download the **LTS (Long Term Support)** version.

After installation, open your terminal and verify:

```text
node --version
```

You should see something like:

```text

v18.17.0

```

Also check npm:

```bash
npm --version
```

You should see something like:

```text
9.6.7
```

> ✅ **Tip:** If both commands show version numbers, you're ready to go!

### Step 2: Install a Code Editor

We recommend **Visual Studio Code (VS Code)**:

- Download: [https://code.visualstudio.com](https://code.visualstudio.com)
- It's free
- Great for JavaScript and Node.js

**Helpful VS Code Extensions:**

- `GraphQL` (by GraphQL Foundation) — syntax highlighting for GraphQL
- `Prettier` — auto-formats your code

### Step 3: Basic Terminal Commands You'll Need

| Command                             | What It Does                        | Example            |
| ----------------------------------- | ----------------------------------- | ------------------ |
| `cd`                                | Change directory (go into a folder) | `cd my-project`    |
| `mkdir`                             | Make a new folder                   | `mkdir my-project` |
| `ls` (Mac/Linux) or `dir` (Windows) | List files in current folder        | `ls`               |
| `node filename.js`                  | Run a JavaScript file               | `node server.js`   |

> 💡 **Tip:** On Windows, you can use **Command Prompt**, **PowerShell**, or the **VS Code integrated terminal** (press <kbd>Ctrl</kbd> + <kbd>`</kbd> inside VS Code).

---

## 3. Project Setup

Let's build your first GraphQL project step by step.

### Step 1: Create a Project Folder

Open your terminal and type:

```text
mkdir graphql-beginner
cd graphql-beginner
```

> 📂 This creates a folder called `graphql-beginner` and moves you inside it.

### Step 2: Initialize a Node.js Project

```bash
npm init -y
```

**What does this do?**

- `npm init` creates a `package.json` file (the "ID card" of your project)
- `-y` means "yes to all default settings" (saves time)

You'll see a new file called `package.json` in your folder. It looks like this:

```text
{
  "name": "graphql-beginner",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Step 3: Install Dependencies

We need three packages. Run this command:

```bash
npm install express graphql express-graphql
```

**What is each package?**

| Package           | What It Does                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `express`         | A web server framework for Node.js. It handles HTTP requests. Think of it as the "waiter" that takes orders. |
| `graphql`         | The core GraphQL library. It understands the GraphQL language. Think of it as the "chef" that knows recipes. |
| `express-graphql` | Connects Express and GraphQL together. Think of it as the "kitchen pass" between the waiter and chef.        |

After installation, your folder structure looks like this:

```text
graphql-beginner/
├── node_modules/        ← (installed packages live here)
├── package.json         ← (your project info)
└── package-lock.json    ← (exact versions of packages)
```

> ⚠️ **Warning:** The `express-graphql` package is now in maintenance mode. It still works perfectly for learning! In Section 13, we'll talk about modern alternatives like Apollo Server.

### Step 4: Create Your Server File

Create a new file called `server.js`:

```text
touch server.js
```

> 💡 **Tip:** On Windows, if `touch` doesn't work, just create the file manually in VS Code or use: `echo. > server.js`

Your folder now looks like this:

```text

graphql-beginner/
├── node_modules/
├── package.json
├── package-lock.json
└── server.js ← (your main file!)

```

---

## 4. First GraphQL Server Demo

Now let's write code! Open `server.js` in your editor and type the following:

```javascript
// Step 1: Import the packages we installed
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Step 2: Define a Schema (what data can be asked for)
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Step 3: Define Resolvers (how to get the data)
const root = {
  hello: () => {
    return "Hello, World! Welcome to GraphQL!";
  },
};

// Step 4: Create the Express server
const app = express();

// Step 5: Connect GraphQL to Express
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables a visual testing tool in the browser
  }),
);

// Step 6: Start the server
app.listen(4000, () => {
  console.log("🚀 GraphQL server running at http://localhost:4000/graphql");
});
```

### Line-by-Line Explanation

Let's break down **every single line**:

---

**Line 1–3: Importing packages**

```text
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
```

- `express` — We load the Express framework to create a web server.
- `graphqlHTTP` — This is a middleware (a "plugin") that lets Express understand GraphQL requests.
- `buildSchema` — This function converts a text string into a GraphQL schema object.

> 🍔 **Analogy:** `express` is the restaurant building, `graphqlHTTP` is the ordering system, and `buildSchema` is the menu printer.

---

**Line 5–9: The Schema**

```javascript
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
```

- The **schema** defines what questions (queries) your API can answer.
- `type Query` — This is the "menu" of available queries.
- `hello: String` — There is a query called `hello` that returns text (a String).

> 🍔 **Analogy:** This is like writing on the menu: "We serve a dish called 'hello' and it's a String (text)."

---

**Line 11–15: The Resolvers**

```text
const root = {
  hello: () => {
    return "Hello, World! Welcome to GraphQL!";
  },
};
```

- A **resolver** is a function that _actually gets the data_.
- When someone asks for `hello`, this function runs and returns the text.

> 🍔 **Analogy:** The schema says "we have a dish called hello." The resolver is the **recipe** — it tells the chef _how_ to make that dish.

---

**Line 17: Create Express app**

```javascript
const app = express();
```

- This creates a new Express web server instance.

---

**Line 19–23: Connect GraphQL**

```text
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
```

- `app.use('/graphql', ...)` — When someone visits `/graphql`, use the GraphQL handler.
- `schema: schema` — Use the schema we defined above.
- `rootValue: root` — Use the resolvers we defined above.
- `graphiql: true` — Enable **GraphiQL** (a visual tool to test queries in the browser).

> 💡 **GraphiQL** (pronounced "graphical") is like a playground where you can type queries and see results — right in your browser!

---

**Line 25–27: Start the server**

```javascript
app.listen(4000, () => {
  console.log("🚀 GraphQL server running at http://localhost:4000/graphql");
});
```

- `app.listen(4000)` — Start listening on port 4000.
- The function inside runs once the server is ready, printing a message.

---

### Run Your Server

In your terminal:

```text
node server.js
```

You should see:

```text

🚀 GraphQL server running at http://localhost:4000/graphql

```

Now open your browser and go to:

```text

http://localhost:4000/graphql

```

You'll see the **GraphiQL interface** — a beautiful playground to test your API! 🎉

> ⚠️ **To stop the server:** Press `Ctrl + C` in your terminal.

---

## 5. Understanding Schema

The **schema** is the most important concept in GraphQL. Let's understand it deeply.

### What is a Schema?

A schema is the **contract** between the client and the server. It says:

- What data exists
- What data you can ask for
- What data you can change
- What shape the data has

```text

┌─────────────────────────────────────────────┐
│ SCHEMA │
│ │
│ ┌───────────┐ ┌───────────┐ ┌──────────┐│
│ │ Types │ │ Queries │ │ Mutations ││
│ │ │ │ │ │ ││
│ │ - String │ │ - hello │ │ - addUser││
│ │ - Int │ │ - users │ │ - delete ││
│ │ - User │ │ - user │ │ ││
│ └───────────┘ └───────────┘ └──────────┘│
│ │
└─────────────────────────────────────────────┘

```

### Types

Types define the **shape** of your data. GraphQL has built-in types and custom types.

**Built-in (Scalar) Types:**

| Type      | What It Means     | Example            |
| --------- | ----------------- | ------------------ |
| `String`  | Text              | `"hello"`, `"Ali"` |
| `Int`     | Whole number      | `1`, `42`, `-7`    |
| `Float`   | Decimal number    | `3.14`, `99.9`     |
| `Boolean` | True or false     | `true`, `false`    |
| `ID`      | Unique identifier | `"1"`, `"abc123"`  |

**Custom Types:**

You can create your own types! For example, a `User`:

```graphql
type User {
  id: ID
  name: String
  age: Int
}
```

> 🍔 **Analogy:** Types are like **blueprints**. A `User` type is a blueprint that says: "Every user has an id, a name, and an age."

### Query

A **Query** is how you **read** (get) data. It's like asking a question.

```text
type Query {
  hello: String
  users: [User]
  user(id: ID!): User
}
```

- `hello: String` — Ask for a hello message, get text back.
- `users: [User]` — Ask for all users, get a list (array) of User objects.
- `user(id: ID!): User` — Ask for one user by ID, get one User back.

> The `!` means **required**. `ID!` means you _must_ provide an ID.
> The `[User]` with square brackets means **a list** of users.

### Mutation

A **Mutation** is how you **change** data. Create, update, or delete.

```graphql
type Mutation {
  addUser(name: String!, age: Int!): User
  deleteUser(id: ID!): String
}
```

> 🍔 **Analogy:**
>
> - **Query** = Reading a book (you look at data but don't change it)
> - **Mutation** = Writing in a notebook (you add, change, or remove data)

### Resolvers

**Resolvers** are the JavaScript functions that actually _do the work_.

Every field in your schema needs a resolver.

```text
Schema says:    "There's a query called 'hello' that returns a String"
Resolver says:  "When someone asks for 'hello', run this function and return this text"
```

```text
const root = {
  // Resolver for the "hello" query
  hello: () => {
    return "Hello, World!";
  },

  // Resolver for the "users" query
  users: () => {
    return usersArray; // returns data from an array
  },
};
```

> 🍔 **Analogy:** The schema is the **menu**. The resolver is the **kitchen**. The menu tells customers what's available; the kitchen actually makes the food.

### How They All Work Together

```text

Client sends query → Schema validates it → Resolver executes it → Data returned
│ │ │ │
"Give me "Is this a "Run the "Here's your
users" valid query?" function" data"

```

---

## 6. First Query Demo

Let's test the server we built in Section 4!

### Step 1: Make Sure Server is Running

```bash
node server.js
```

### Step 2: Open GraphiQL

Go to `http://localhost:4000/graphql` in your browser.

### Step 3: Type Your First Query

In the left panel of GraphiQL, type:

```text
{
  hello
}
```

### Step 4: Click the ▶️ Play Button

You'll see this response in the right panel:

```json
{
  "data": {
    "hello": "Hello, World! Welcome to GraphQL!"
  }
}
```

### Understanding the Request and Response

**Request (what you asked):**

```text
{
  hello
}
```

- The `{ }` wraps your query.
- `hello` is the field you're asking for.
- You're saying: _"Hey server, give me the value of 'hello'."_

**Response (what you got):**

```json
{
  "data": {
    "hello": "Hello, World! Welcome to GraphQL!"
  }
}
```

- All GraphQL responses are wrapped in a `"data"` object.
- Inside, you see `"hello"` with the value your resolver returned.

> 💡 **Key Insight:** Notice how the _shape_ of the response matches the _shape_ of the query? This is one of GraphQL's superpowers! You always know what you'll get back.

```text
Query shape:        Response shape:
{                   {
  hello               "data": {
}                       "hello": "..."
                      }
                    }
```

### Try an Error

Type something that doesn't exist:

```text
{
  goodbye
}
```

You'll get an error:

```json
{
  "errors": [
    {
      "message": "Cannot query field \"goodbye\" on type \"Query\"."
    }
  ]
}
```

> This is the schema protecting you! It says: "I don't have a field called `goodbye` on my menu."

---

## 7. Dynamic Data Demo

Let's make things more interesting! We'll create a list of users and query them.

### Update `server.js` for Mutations

Replace your entire `server.js` with this:

```text
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// ──────────────────────────────────────
// FAKE DATABASE: An array of users
// ──────────────────────────────────────
let users = [
  { id: "1", name: "Ali", age: 22 },
  { id: "2", name: "Sara", age: 28 },
  { id: "3", name: "John", age: 35 },
];

// ──────────────────────────────────────
// SCHEMA: Define what data looks like
// ──────────────────────────────────────
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    age: Int
  }

  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
  }
`);

// ──────────────────────────────────────
// RESOLVERS: Define how to get the data
// ──────────────────────────────────────
const root = {
  // Returns a greeting
  hello: () => {
    return "Hello from GraphQL!";
  },

  // Returns ALL users
  users: () => {
    return users;
  },

  // Returns ONE user by ID
  user: ({ id }) => {
    return users.find((user) => user.id === id);
  },
};

// ──────────────────────────────────────
// SERVER SETUP
// ──────────────────────────────────────
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
```

### What's New in Mutations?

1. **`users` array** — Our fake database with 3 users.
2. **`type User`** — A custom type describing what a User looks like.
3. **`users: [User]`** — A query that returns a list of all users.
4. **`user(id: ID!): User`** — A query that takes an `id` argument and returns one user.
5. **`users.find(...)`** — Standard JavaScript to search the array.

### Restart the Server

> ⚠️ **Important:** Every time you change `server.js`, you must restart the server!

Press `Ctrl + C` to stop, then:

```bash
node server.js
```

> 💡 **Tip:** Later, you can use `nodemon` to auto-restart. Install it with `npm install -g nodemon` and run `nodemon server.js`.

### Try These Queries

#### Query 1: Get All Users (all fields)

```text
{
  users {
    id
    name
    age
  }
}
```

**Response:**

```json
{
  "data": {
    "users": [
      { "id": "1", "name": "Ali", "age": 22 },
      { "id": "2", "name": "Sara", "age": 28 },
      { "id": "3", "name": "John", "age": 35 }
    ]
  }
}
```

#### Query 2: Get Only Names (no over-fetching!)

```text
{
  users {
    name
  }
}
```

**Response:**

```json
{
  "data": {
    "users": [{ "name": "Ali" }, { "name": "Sara" }, { "name": "John" }]
  }
}
```

> 🎯 **This is GraphQL's superpower!** You only asked for `name`, and you _only_ got `name`. No extra data. With REST, you'd get everything whether you wanted it or not.

#### Query 3: Get One User by ID

```text
{
  user(id: "2") {
    name
    age
  }
}
```

**Response:**

```json
{
  "data": {
    "user": {
      "name": "Sara",
      "age": 28
    }
  }
}
```

#### Query 4: Multiple Queries at Once

```text
{
  hello
  users {
    name
  }
  user(id: "1") {
    name
    age
  }
}
```

**Response:**

```json
{
  "data": {
    "hello": "Hello from GraphQL!",
    "users": [{ "name": "Ali" }, { "name": "Sara" }, { "name": "John" }],
    "user": {
      "name": "Ali",
      "age": 22
    }
  }
}
```

> 🎯 **One request, multiple pieces of data!** With REST, this would have been 3 separate API calls.

---

## 8. Mutation Demo

So far we've only _read_ data. Now let's learn to _change_ data.

### Update `server.js`

Add mutations to your schema and resolvers. Replace the full file:

```text
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// ──────────────────────────────────────
// FAKE DATABASE
// ──────────────────────────────────────
let users = [
  { id: "1", name: "Ali", age: 22 },
  { id: "2", name: "Sara", age: 28 },
  { id: "3", name: "John", age: 35 },
];

// Helper: generate next ID
let nextId = 4;

// ──────────────────────────────────────
// SCHEMA
// ──────────────────────────────────────
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    age: Int
  }

  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, age: Int!): User
    deleteUser(id: ID!): String
    updateUser(id: ID!, name: String, age: Int): User
  }
`);

// ──────────────────────────────────────
// RESOLVERS
// ──────────────────────────────────────
const root = {
  // ── Queries ──
  hello: () => "Hello from GraphQL!",

  users: () => users,

  user: ({ id }) => users.find((user) => user.id === id),

  // ── Mutations ──
  addUser: ({ name, age }) => {
    const newUser = {
      id: String(nextId++),
      name: name,
      age: age,
    };
    users.push(newUser); // Add to our array
    return newUser; // Return the new user
  },

  deleteUser: ({ id }) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return "User not found!";
    users.splice(index, 1); // Remove from array
    return `User with id ${id} was deleted.`;
  },

  updateUser: ({ id, name, age }) => {
    const user = users.find((user) => user.id === id);
    if (!user) return null;
    if (name !== undefined) user.name = name; // Update name if provided
    if (age !== undefined) user.age = age; // Update age if provided
    return user;
  },
};

// ──────────────────────────────────────
// SERVER
// ──────────────────────────────────────
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
```

### What's New?

**In the schema:**

```graphql
type Mutation {
  addUser(name: String!, age: Int!): User
  deleteUser(id: ID!): String
  updateUser(id: ID!, name: String, age: Int): User
}
```

- `addUser` — Takes a name and age, returns the new User.
- `deleteUser` — Takes an id, returns a confirmation message.
- `updateUser` — Takes an id and optional new values, returns the updated User.

**In the resolvers:**

Each mutation is a JavaScript function that modifies the `users` array.

### Restart & Test

```text
# Stop server: Ctrl + C
node server.js
```

#### Mutation 1: Add a User

```graphql
mutation {
  addUser(name: "Ali", age: 22) {
    id
    name
  }
}
```

**Response:**

```text
{
  "data": {
    "addUser": {
      "id": "4",
      "name": "Ali"
    }
  }
}
```

> Notice the keyword `mutation` at the beginning. For queries, the keyword `query` is optional (the `{ }` is shorthand). For mutations, you **must** write `mutation`.

#### Mutation 2: Update a User

```graphql
mutation {
  updateUser(id: "2", name: "Sara Khan") {
    id
    name
    age
  }
}
```

**Response:**

```text
{
  "data": {
    "updateUser": {
      "id": "2",
      "name": "Sara Khan",
      "age": 28
    }
  }
}
```

#### Mutation 3: Delete a User

```graphql
mutation {
  deleteUser(id: "3")
}
```

**Response:**

```text
{
  "data": {
    "deleteUser": "User with id 3 was deleted."
  }
}
```

#### Verify: Check All Users

```graphql
{
  users {
    id
    name
    age
  }
}
```

You should see the updated list with your changes!

> ⚠️ **Warning:** Our data is stored in memory (a JavaScript array). If you restart the server, all changes are lost! Later, you'll learn to use a real database like MongoDB.

---

## 9. Connect with Node.js Logic

You've already been doing this! But let's make it explicit.

### Resolvers ARE JavaScript Functions

The magic of GraphQL resolvers is that they are **just regular JavaScript functions**. Inside them, you can do _anything_ JavaScript can do:

```text
// You can do math
total: () => {
  return 10 + 20;   // Returns 30
},

// You can use string manipulation
greeting: ({ name }) => {
  return `Welcome, ${name.toUpperCase()}!`;
},

// You can filter arrays
adults: () => {
  return users.filter(user => user.age >= 18);
},

// You can call other functions
timestamp: () => {
  return new Date().toISOString();
},
```

### Example: Adding Business Logic

Let's add a query that returns user statistics:

**Add to schema inside `type Query`:**

```graphql
type Query {
  hello: String
  users: [User]
  user(id: ID!): User
  userCount: Int
  averageAge: Float
}
```

**Add to resolvers:**

```text
userCount: () => {
  return users.length;
},

averageAge: () => {
  const total = users.reduce((sum, user) => sum + user.age, 0);
  return total / users.length;
},
```

**Query:**

```graphql
{
  userCount
  averageAge
}
```

**Response:**

```text
{
  "data": {
    "userCount": 3,
    "averageAge": 28.33
  }
}
```

### The Flow

```text

┌────────────┐ GraphQL Query ┌────────────┐ Calls ┌────────────┐
│ │ ──────────────────► │ │ ──────────► │ │
│ Client │ │ Schema │ │ Resolver │
│ (Browser) │ ◄────────────────── │ (Validates)│ ◄────────── │ (JS Code) │
│ │ JSON Response │ │ Returns │ │
└────────────┘ └────────────┘ Data └────────────┘
│
│ Can access:
▼
┌─────────────────────┐
│ • Arrays │
│ • Databases │
│ • External APIs │
│ • Files │
│ • Any JS logic! │
└─────────────────────┘

```

> 💡 **Key Takeaway:** GraphQL doesn't care _where_ your data comes from. The resolver is just a function — you decide what it does inside.

---

## 10. Common Beginner Errors

Here are the mistakes almost every beginner makes, and how to fix them.

### Error 1: Port Already in Use

**Error message:**

```text

Error: listen EADDRINUSE: address already in use :::4000

```

**Why:** Another process is already using port 4000. Maybe you forgot to stop a previous server.

**Fix:**

```bash
# Option 1: Kill the process (Mac/Linux)
lsof -i :4000
kill -9 <PID>

# Option 2: Kill the process (Windows)
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Option 3: Just use a different port
app.listen(5000, () => { ... });
```

### Error 2: Schema Syntax Mistakes

**Wrong:**

```text
type Query {
  hello: string    // ❌ lowercase 's'
}
```

**Right:**

```graphql
type Query {
  hello: String    // ✅ capital 'S'
}
```

> ⚠️ GraphQL types are **case-sensitive**. It's `String`, `Int`, `Float`, `Boolean`, `ID` — always capitalized.

### Error 3: Missing Commas or Brackets in JavaScript

**Wrong:**

```text
const root = {
  hello: () => 'Hi'    // ❌ Missing comma
  users: () => users
};
```

**Right:**

```javascript
const root = {
  hello: () => "Hi", // ✅ Comma after each resolver
  users: () => users,
};
```

### Error 4: Wrong Query Names

**Schema says:**

```text
type Query {
  users: [User]
}
```

**You type in GraphiQL:**

```graphql
{
  user {
    # ❌ "user" doesn't exist, schema has "users" (plural)
    name
  }
}
```

**Error:**

```text
Cannot query field "user" on type "Query".
```

**Fix:** Make sure your query name matches what's in the schema exactly.

### Error 5: Forgetting to Restart Server

If you change `server.js` and don't restart, you'll still see old behavior.

**Fix:**

```text
# Stop: Ctrl + C
# Start again:
node server.js

# Or use nodemon for auto-restart:
npm install -g nodemon
nodemon server.js
```

### Error 6: Querying Fields That Don't Exist on a Type

**Schema:**

```graphql
type User {
  id: ID
  name: String
  age: Int
}
```

**Wrong query:**

```text
{
  users {
    email # ❌ "email" is not in the User type
  }
}
```

**Fix:** Only query fields that exist in your type definition.

### Quick Debugging Checklist

```text

□ Is the server running?
□ Did you restart after changes?
□ Are schema type names capitalized?
□ Do query names match schema exactly?
□ Are there commas between resolver functions?
□ Are parentheses and brackets balanced?
□ Is the URL correct? (http://localhost:4000/graphql)

```

---

## 11. Best Practices for Beginners

### 1. Keep Your Schema Clean and Readable

**Bad:**

```graphql
type Query {
  hello: String
  users: [User]
  user(id: ID!): User
}
```

**Good:**

```text
type Query {
  hello: String
  users: [User]
  user(id: ID!): User
}
```

### 2. Use Clear, Descriptive Names

**Bad:**

```graphql
type Query {
  g: String # What is 'g'??
  d: [User] # What is 'd'??
}
```

**Good:**

```text
type Query {
  greeting: String
  allUsers: [User]
}
```

### 3. Test After Every Small Change

Don't write 100 lines and then test. Instead:

1. Add one query to schema → test it.
2. Add one resolver → test it.
3. Add one mutation → test it.

> 💡 **Tip:** Small steps = fewer bugs = less frustration.

### 4. Separate Files Later

For now, one `server.js` file is fine. When your project grows, separate into:

```text

graphql-beginner/
├── server.js ← Express setup only
├── schema.js ← Schema definitions
├── resolvers.js ← Resolver functions
└── data.js ← Fake data / database connection

```

### 5. Use Comments

```javascript
// Returns all users from the database
users: () => {
  return users;
},
```

### 6. Use the `!` (Non-null) Wisely

```text
type User {
  id: ID! # ID is always required (never null)
  name: String! # Name is always required
  age: Int # Age is optional (can be null)
}
```

### 7. Handle Errors in Resolvers

```javascript
user: ({ id }) => {
  const found = users.find(user => user.id === id);
  if (!found) {
    throw new Error(`User with id ${id} not found`);
  }
  return found;
},
```

---

## 12. Mini Practice Tasks

Now it's your turn! Try these exercises to cement your understanding.

### Task 1: Add an Email Field ⭐

**Challenge:** Add an `email` field (String) to the User type. Update the fake data to include emails. Query it.

<details>
<summary>💡 Hint</summary>

Add `email: String` to `type User` in the schema, and add email values to each object in the `users` array.

</details>

---

### Task 2: Create a "Books" Schema ⭐⭐

**Challenge:** Create a completely new schema for books with these fields:

- `id` (ID)
- `title` (String)
- `author` (String)
- `year` (Int)

Create a fake data array with 3 books and a query to fetch all books.

<details>
<summary>💡 Hint</summary>

Follow the same pattern as Users: define a `type Book`, add `books: [Book]` to Query, create a resolver that returns the array.

</details>

---

### Task 3: Single Book Query ⭐⭐

**Challenge:** Add a query called `book(id: ID!)` that returns a single book by its ID.

<details>
<summary>💡 Hint</summary>

```text
book: ({ id }) => books.find((book) => book.id === id);
```

</details>

---

### Task 4: Add a "addBook" Mutation ⭐⭐⭐

**Challenge:** Create a mutation that adds a new book to the array. It should accept `title`, `author`, and `year` as arguments.

<details>
<summary>💡 Hint</summary>

Follow the same pattern as `addUser`. Don't forget to:

1. Add the mutation to the schema.
2. Create the resolver function.
3. Generate a new ID.

</details>

---

### Task 5: Search Users by Name ⭐⭐⭐

**Challenge:** Create a query called `searchUsers(name: String!)` that returns all users whose name contains the search string.

<details>
<summary>💡 Hint</summary>

```javascript
searchUsers: ({ name }) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  );
};
```

Return type should be `[User]`.

</details>

---

### Bonus Challenge 🏆

Combine everything: Create a project with **both** Users and Books. Add a `favoriteBook` field to User that references a Book. This is called a **relationship** — a preview of more advanced GraphQL!

---

## 13. Next Step Roadmap

Congratulations! 🎉 You've learned the fundamentals of GraphQL with Node.js. Here's what to learn next:

```text
You Are Here
     │
     ▼
┌─────────────────────┐
│ ✅ GraphQL Basics    │  ← This guide
│ ✅ Schema & Types    │
│ ✅ Queries           │
│ ✅ Mutations         │
│ ✅ Resolvers         │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Apollo Server        │  ← Modern GraphQL server (replaces express-graphql)
│ • Better features    │
│ • Better errors      │
│ • Built-in playground│
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Database Integration │  ← Store real data
│ • MongoDB + Mongoose │
│ • PostgreSQL + Prisma│
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Authentication       │  ← Secure your API
│ • JWT Tokens         │
│ • Login / Signup     │
│ • Protected Queries  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Advanced Topics      │
│ • Subscriptions      │  ← Real-time data (like chat)
│ • File Uploads       │
│ • Pagination         │
│ • Caching            │
│ • Error Handling     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Real Projects        │  ← Build portfolio projects
│ • Blog API           │
│ • E-commerce API     │
│ • Social Media API   │
│ • Chat Application   │
└─────────────────────┘
```

### Recommended Resources

| Resource              | Type          | Link                                                                        |
| --------------------- | ------------- | --------------------------------------------------------------------------- |
| GraphQL Official Docs | Documentation | [graphql.org/learn](https://graphql.org/learn/)                             |
| Apollo Server Docs    | Documentation | [apollographql.com/docs](https://www.apollographql.com/docs/apollo-server/) |
| How to GraphQL        | Free Tutorial | [howtographql.com](https://www.howtographql.com/)                           |
| GraphQL with MongoDB  | Tutorial      | Search "GraphQL MongoDB tutorial" on YouTube                                |

---

## Final Summary

Here's everything you learned in this guide:

| Concept             | What You Learned                                          |
| ------------------- | --------------------------------------------------------- |
| **GraphQL**         | A query language for APIs — ask for exactly what you need |
| **Schema**          | Defines what data is available (the menu)                 |
| **Types**           | Describe the shape of data (String, Int, custom types)    |
| **Query**           | How to READ data                                          |
| **Mutation**        | How to CHANGE data (create, update, delete)               |
| **Resolver**        | JavaScript functions that fetch/modify data               |
| **GraphiQL**        | Browser tool to test queries                              |
| **express-graphql** | Middleware connecting Express and GraphQL                 |

### The Complete Code

Your final `server.js` with everything from this guide is in [Section 8](#8-mutation-demo). Save it, experiment with it, and break it to learn!

---

> 🚀 **You did it!** You went from zero to building a working GraphQL API with Node.js. Keep practicing, keep building, and most importantly — have fun!

---

_Created for beginners with ❤️. Last updated: 2025._
