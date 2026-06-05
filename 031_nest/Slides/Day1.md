# NestJS — Comprehensive Study Guide

> _Transformed from lecture notes into a complete reference for studying and revision._
> _Written for developers familiar with Node.js / Express.js._

---

## Table of Contents

1. [What is NestJS?](#1-what-is-nestjs)
2. [NestJS vs Express.js — The Mental Shift](#2-nestjs-vs-expressjs--the-mental-shift)
3. [Project Setup](#3-project-setup)
4. [Architecture Overview](#4-architecture-overview)
5. [Decorators — The Heart of NestJS](#5-decorators--the-heart-of-nestjs)
6. [Modules](#6-modules)
7. [Controllers](#7-controllers)
8. [Providers and Services](#8-providers-and-services)
9. [Dependency Injection (DI)](#9-dependency-injection-di)
10. [Request Lifecycle in NestJS](#10-request-lifecycle-in-nestjs)
11. [Defining Types: `type` vs `interface` vs `class`](#11-defining-types-type-vs-interface-vs-class)
12. [Exception Handling](#12-exception-handling)
13. [Middleware](#13-middleware)
14. [Building a Complete User Module — Step by Step](#14-building-a-complete-user-module--step-by-step)
15. [Summary](#15-summary)
16. [Quick Revision Notes](#16-quick-revision-notes)
17. [Potential Interview / Exam Questions](#17-potential-interview--exam-questions)

---

## 1. What is NestJS?

### Simple Definition

**NestJS** is a backend framework for building server-side applications using **Node.js** and **TypeScript**. Think of it as Express.js with a rigid, opinionated structure imposed on top.

Under the hood, NestJS still uses either **Express** or **Fastify** as the HTTP engine — it doesn't reinvent the wheel. What it _does_ add is a powerful layer of architecture, conventions, and tooling that makes large applications easier to reason about, test, and maintain.

### Why Was NestJS Created?

Express.js gives you complete freedom. That freedom is great for small projects, but it becomes a problem as applications grow:

- Where should business logic live?
- How should modules talk to each other?
- How do you manage dependencies without creating spaghetti code?

NestJS answers all of these questions by borrowing heavily from **Angular** (a frontend framework), applying concepts like **modules**, **decorators**, **dependency injection**, and a strongly typed architecture to the backend.

### Key Characteristics

- Written in and for **TypeScript** (though plain JavaScript works too).
- Uses **decorators** extensively to describe classes and methods.
- Follows **SOLID principles** by default.
- Built-in support for REST APIs, GraphQL, WebSockets, microservices.
- Provides a powerful **CLI** for scaffolding code quickly.

---

## 2. NestJS vs Express.js — The Mental Shift

If you're coming from Express.js, here is the most important conceptual shift you need to make:

| Concern | Express.js | NestJS |
|---|---|---|
| Structure | You decide | Enforced by framework |
| Routing | `app.get('/users', handler)` | `@Get('/users')` decorator on a method |
| Middleware | `app.use(fn)` | `configure()` in a `NestModule` |
| Business logic | Anywhere you put it | In injectable `Service` classes |
| Dependency management | Manual imports / `require` | Dependency Injection container |
| TypeScript | Optional | First-class citizen |

In Express, you often write a single `app.js` that grows endlessly. In NestJS, everything is split into **modules**, each of which owns its own controllers and services.

---

## 3. Project Setup

### Installing the NestJS CLI

The **NestJS CLI** is a command-line tool that generates boilerplate code for you.

```bash
npm install -g @nestjs/cli
```

The `-g` flag installs it **globally**, meaning you can use the `nest` command from anywhere on your machine.

### Creating a New Project

```bash
nest new my-project
```

This command:
1. Creates a new folder called `my-project`.
2. Scaffolds the entire project structure.
3. Installs all required dependencies automatically.
4. Lets you choose between `npm`, `yarn`, or `pnpm`.

### Starting the Development Server

Open `package.json` and look at the `scripts` section. You will see:

```json
"scripts": {
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main"
}
```

To run the server in **watch mode** (auto-restart on file changes):

```bash
npm run start:dev
```

> **Note from your notes:** You mentioned changing the `start` script to `npm start dev` — what you actually want is `npm run start:dev`, which runs the `start:dev` script defined in `package.json`.

### Generated Project Structure

```
src/
├── app.controller.ts       ← Root controller
├── app.controller.spec.ts  ← Unit test for the controller
├── app.module.ts           ← Root module (entry point of the app)
├── app.service.ts          ← Root service
└── main.ts                 ← Bootstrap file (starts the HTTP server)
```

**`main.ts`** — This is where your app boots:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

`NestFactory.create(AppModule)` wires up the entire application starting from the root module.

---

## 4. Architecture Overview

NestJS organizes an application into three main building blocks:

```
┌─────────────────────────────────────────────────┐
│                   HTTP Request                  │
└─────────────────────────┬───────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│                  Middleware                     │
│         (runs before route handler)             │
└─────────────────────────┬───────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│                  Controller                     │
│     (handles routing, reads request data)       │
└─────────────────────────┬───────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│                   Service                       │
│     (business logic, database operations)       │
└─────────────────────────┬───────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│              Database / Data Layer              │
└─────────────────────────────────────────────────┘
```

### Why Separate Controllers from Services?

Your notes asked an important question: _"Why does the controller call the service to deal with the database? Isn't the controller supposed to deal with the database directly like in Node?"_

This is a very common question. The short answer is: **separation of concerns**.

In small Express apps, developers sometimes write database logic directly in route handlers. This works for toy projects, but creates problems at scale:

1. **Testability**: If your database logic is inside the controller, you can't test your business logic without making real database calls.
2. **Reusability**: What if two different controllers need the same database operation? With a service, you call the same method from both.
3. **Maintainability**: When your database changes (e.g., MongoDB → PostgreSQL), you only update the service, not every controller.

Think of it this way:
- **Controller** = The receptionist. Receives requests, validates inputs, delegates work, returns responses.
- **Service** = The actual worker. Knows how to do the real job (talk to the database, call external APIs, run calculations).

---

## 5. Decorators — The Heart of NestJS

### What is a Decorator?

A **decorator** is a special TypeScript/JavaScript syntax (starting with `@`) that attaches **metadata** or **behavior** to a class, method, property, or parameter.

Think of it as a label or sticker you put on code to tell the framework: _"Hey, this class is a Controller"_ or _"This method handles GET requests"_.

```typescript
@Controller('users')       // ← This is a class decorator
export class UsersController {

  @Get()                   // ← This is a method decorator
  findAll() {
    return [];
  }
}
```

### How Decorators Work Behind the Scenes

Decorators use the **Reflect Metadata** API to store information about your classes at runtime. When NestJS starts up, it scans all your modules, reads that metadata, and wires everything together.

This is why `tsconfig.json` in a NestJS project always has:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Without these flags, decorators will not work.

### Common Decorators in NestJS

#### Class Decorators

| Decorator | Purpose |
|---|---|
| `@Module({...})` | Marks a class as a NestJS module |
| `@Controller('path')` | Marks a class as a controller, sets the base route |
| `@Injectable()` | Marks a class as a provider (injectable service) |

#### Method Decorators (HTTP verbs)

| Decorator | HTTP Method |
|---|---|
| `@Get('path')` | GET request |
| `@Post('path')` | POST request |
| `@Put('path')` | PUT request |
| `@Patch('path')` | PATCH request |
| `@Delete('path')` | DELETE request |

#### Parameter Decorators

| Decorator | What it extracts |
|---|---|
| `@Body()` | The entire request body (JSON payload) |
| `@Param('id')` | A route parameter (e.g., `/users/:id`) |
| `@Query('page')` | A query string parameter (e.g., `?page=1`) |
| `@Headers('auth')` | A specific request header |
| `@Req()` | The raw Express `request` object |
| `@Res()` | The raw Express `response` object |

### Routing with Decorators

The full URL of a route is composed of two parts:

```
base route (from @Controller)  +  method route (from @Get / @Post / etc.)
```

**Example:**

```typescript
@Controller('hello')        // base: /hello
export class AppController {

  @Get()                    // GET /hello
  getRoot() { ... }

  @Get('world')             // GET /hello/world
  getWorld() { ... }

  @Get(':id')               // GET /hello/42
  getById(@Param('id') id: string) { ... }
}
```

---

## 6. Modules

### What is a Module?

A **module** is a class decorated with `@Module()`. It acts as a **container** that groups together related code: controllers, services, and other dependencies.

Every NestJS application has exactly one **root module** (`AppModule`), and then any number of **feature modules** (e.g., `UsersModule`, `AuthModule`, `ProductsModule`).

### Module Decorator Properties

```typescript
@Module({
  imports:     [],   // Other modules this module depends on
  controllers: [],   // Controllers belonging to this module
  providers:   [],   // Services and other providers for this module
  exports:     [],   // Providers to share with other modules
})
```

Let's explain each property:

#### `imports`
An array of **other modules** that this module needs. If `UsersModule` needs to send emails, it would import `MailModule` here. When you import a module, you get access to the providers it **exports**.

#### `controllers`
An array of **controller classes** that belong to this module. NestJS registers their routes when it reads this array.

#### `providers`
An array of **injectable classes** (services, repositories, guards, etc.) that are available within this module. By default, they are **private** to the module — other modules cannot use them unless you explicitly export them.

#### `exports`
An array of **providers** (from the `providers` array) that you want to make available to other modules that import this module.

> **Your question:** _"Is the module like Angular? Like the model?"_
>
> Yes! NestJS modules are directly inspired by Angular modules. They are **not** like the "Model" in MVC (that's what services/entities are for). They are organizational units — like folders that tell NestJS what belongs together.

### The Root Module

`AppModule` is the starting point. Every feature module you create must eventually be imported into `AppModule` (directly or via another module) for NestJS to discover it.

```typescript
// app.module.ts
@Module({
  imports: [UsersModule, ProductsModule],  // ← Register feature modules here
})
export class AppModule {}
```

---

## 7. Controllers

### What is a Controller?

A **controller** is responsible for:
1. **Receiving** HTTP requests.
2. **Extracting** data from the request (body, params, query strings).
3. **Calling** the appropriate service method.
4. **Returning** a response.

Controllers do **not** contain business logic. They are thin routing layers.

### A Complete Controller Example

```typescript
// users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  
  // Dependency Injection: NestJS provides the service automatically
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users?role=admin
  @Get()
  findAllWithQuery(@Query('role') role: string) {
    return this.usersService.findByRole(role);
  }

  // GET /users/42
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); // +id converts string to number
  }

  // POST /users (body: { name: 'Alice', email: 'alice@example.com' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PUT /users/42
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<CreateUserDto>) {
    return this.usersService.update(+id, updateData);
  }

  // DELETE /users/42
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

### Extracting Request Data

#### `@Body()` — Reading the Request Body

When a client sends a POST/PUT request with JSON data, `@Body()` extracts it:

```typescript
// Client sends: POST /users  with body: { "name": "Alice", "email": "alice@example.com" }
@Post()
create(@Body() body: any) {
  console.log(body.name);   // "Alice"
  console.log(body.email);  // "alice@example.com"
}
```

You can also extract a specific field:

```typescript
@Post()
create(@Body('name') name: string) {
  // Only extracts the 'name' field
}
```

#### `@Param()` — Reading Route Parameters

Route parameters are parts of the URL defined with `:paramName`:

```typescript
// Route: GET /users/:id
@Get(':id')
findOne(@Param('id') id: string) {
  // If URL is /users/42, then id = "42" (always a string!)
  return this.usersService.findOne(+id); // Convert to number with the + operator
}
```

> **Important:** Route parameters are **always strings** in TypeScript, even if the client sends a number in the URL. You must convert them manually with `+id` (unary plus) or `parseInt(id)`.

#### `@Query()` — Reading Query String Parameters

Query parameters come after the `?` in the URL:

```typescript
// URL: GET /users?page=2&limit=10
@Get()
findAll(
  @Query('page') page: string,
  @Query('limit') limit: string,
) {
  return this.usersService.findAll(+page, +limit);
}
```

---

## 8. Providers and Services

### What is a Provider?

A **provider** is any class decorated with `@Injectable()`. The name "provider" is the NestJS term for _anything that can be injected as a dependency_.

The most common type of provider is a **Service**.

### What is a Service?

A **service** contains the **business logic** of your application. It's where you:
- Query the database.
- Perform calculations.
- Call external APIs.
- Apply business rules.

```typescript
// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.type';

@Injectable()
export class UsersService {
  
  // Simulating a database with an in-memory array
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob',   email: 'bob@example.com'   },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateData: Partial<User>): User {
    const user = this.findOne(id); // reuse findOne (throws if not found)
    Object.assign(user, updateData);
    return user;
  }

  remove(id: number): { message: string } {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(index, 1);
    return { message: `User ${id} deleted` };
  }
}
```

### The Singleton Pattern

Your notes mention that providers follow the **singleton** pattern. This means:

- NestJS creates **only one instance** of each service per module scope.
- Every controller or service that injects `UsersService` gets the **same instance**.
- State stored in the service (like the `users` array above) is **shared** across all consumers.

This is why you should not store request-specific data in a service — it would be shared across all requests!

---

## 9. Dependency Injection (DI)

### What is Dependency Injection?

Dependency Injection is a design pattern where a class **does not create its own dependencies** — instead, something external provides them.

#### Without DI (tight coupling):

```typescript
// ❌ Bad: Controller creates its own service
class UsersController {
  private service = new UsersService(); // Hard-coded dependency
}
```

Problems:
- If `UsersService` needs constructor arguments, you must manage them manually.
- You can't swap `UsersService` for a mock in tests.
- If `UsersService` itself depends on other things, the complexity explodes.

#### With DI (loose coupling):

```typescript
// ✅ Good: NestJS provides the service
class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // NestJS reads the type hint and injects the right instance
}
```

NestJS reads the TypeScript type `UsersService` in the constructor, looks it up in the **IoC Container**, and passes the singleton instance automatically.

### What is the IoC Container?

Your notes asked: _"What actually creates an instance of that service? The IoC Container?"_

**Yes, exactly.** IoC stands for **Inversion of Control**. Instead of your code controlling when and how dependencies are created, you _invert_ that control — you hand it to the framework.

NestJS's IoC Container:
1. Reads the `providers` array in your module at startup.
2. Creates a single instance of each provider.
3. Stores instances in a registry.
4. When a class declares a constructor parameter of type `UsersService`, the container resolves and injects the stored instance.

```
┌──────────────────────────────────────────────┐
│             NestJS IoC Container              │
│                                              │
│  UsersService ──────────────────────┐        │
│  AuthService  ────────────────────┐ │        │
│  MailService  ──────────────────┐ │ │        │
│                                 ↓ ↓ ↓        │
│             UsersController ────────────     │
│                (receives all 3 above)        │
└──────────────────────────────────────────────┘
```

### Composition vs Interface — What Your Notes Mention

Your notes say: _"composition in most occasions is not good due to tight coupling, so it's better to depend on an interface."_

This is the **Dependency Inversion Principle** (the D in SOLID):

> _"High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces)."_

**Tight Coupling Example (bad):**

```typescript
// Controller is tightly coupled to the concrete UsersService class
class UsersController {
  private service = new UsersService(); // Can never be swapped
}
```

**Interface-Based (better):**

```typescript
interface IUsersService {
  findAll(): User[];
  findOne(id: number): User;
}

class UsersController {
  constructor(private readonly service: IUsersService) {}
  // Now you can inject MockUsersService in tests
}
```

In NestJS, this is typically handled via **custom providers** and tokens, but for most everyday use, injecting the class directly is the common pattern (and NestJS makes it easy to mock in tests regardless).

---

## 10. Request Lifecycle in NestJS

When an HTTP request hits your NestJS application, it flows through a series of layers in a defined order:

```
Incoming Request
      │
      ▼
┌─────────────────┐
│   Middleware    │  ← Runs first (logging, CORS, body parsing)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Guards       │  ← Authorization / Authentication checks
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Interceptors   │  ← Transform request/response (logging, caching)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Pipes        │  ← Validation and transformation of input data
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Controller    │  ← Route matched, handler method called
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Service      │  ← Business logic executed
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Interceptors   │  ← Run again on the way OUT (transform response)
└────────┬────────┘
         │
         ▼
Outgoing Response
```

> We will focus on **Middleware**, **Controllers**, and **Services** in this guide as that is what your lecture covered.

---

## 11. Defining Types: `type` vs `interface` vs `class`

Your notes mention defining user types in a `users.type.ts` file and ask about the differences.

### `type` alias

```typescript
// users.type.ts
export type User = {
  id: number;
  name: string;
  email: string;
};
```

- Simple, lightweight.
- **Cannot be declared twice** with the same name (will cause a compile error).
- Cannot be extended using `extends` (you use intersection `&` instead).
- Cannot be used with `instanceof` at runtime.

### `interface`

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
}
```

- **Declaration merging:** If you declare `interface User` twice, TypeScript **merges** them into one. This is intentional behavior for extensibility (e.g., extending third-party types).
- Can be extended with `extends`.
- Cannot hold non-object shapes (no primitive aliases).

### `class`

```typescript
export class User {
  id: number;
  name: string;
  email: string;
}
```

- **Exists at runtime** (unlike `type` and `interface` which disappear after compilation).
- Can be used with `instanceof`.
- Can have **constructor logic**, **methods**, and **default values**.
- NestJS's **Pipes** and **Validation** (`class-validator`) require a `class` (because they need the class to exist at runtime for metadata).

### Which to Use?

| Use case | Recommended |
|---|---|
| Simple data shape, no validation | `interface` or `type` |
| DTO (Data Transfer Object) with validation | `class` |
| Domain entity (with methods) | `class` |
| Union types (`'admin' \| 'user'`) | `type` |

> **Your note says:** _"I am supposed to do the task using class."_ This is correct for NestJS — use a `class` for your DTOs (Data Transfer Objects) because NestJS's validation features (`class-validator`, `ValidationPipe`) require classes to function.

---

## 12. Exception Handling

### NestJS Built-in Exception Layer

Your notes correctly note that NestJS has a **built-in exception layer**. You don't need to write generic error-handling middleware like you would in Express.

NestJS ships with a set of standard HTTP exceptions in `@nestjs/common`:

```typescript
import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
```

### Using Built-in Exceptions

```typescript
// In your service:
findOne(id: number): User {
  const user = this.users.find(u => u.id === id);
  if (!user) {
    // NestJS catches this and returns: { statusCode: 404, message: "User not found" }
    throw new NotFoundException('User not found');
  }
  return user;
}
```

NestJS's **Global Exception Filter** catches these exceptions and automatically formats the response:

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### Common Built-in Exceptions

| Exception Class | HTTP Status |
|---|---|
| `BadRequestException` | 400 |
| `UnauthorizedException` | 401 |
| `ForbiddenException` | 403 |
| `NotFoundException` | 404 |
| `ConflictException` | 409 |
| `InternalServerErrorException` | 500 |

You can also throw a generic `HttpException`:

```typescript
throw new HttpException('Custom message', HttpStatus.I_AM_A_TEAPOT); // 418 😄
```

---

## 13. Middleware

### What is Middleware?

**Middleware** is a function that runs **before** the request reaches the route handler (controller method). It has access to the request (`req`) and response (`res`) objects.

Common uses:
- Logging every incoming request.
- Verifying authentication tokens.
- Parsing custom headers.
- Rate limiting.
- CORS handling.

> **Your question:** _"Why use middleware?"_
>
> Middleware lets you run **cross-cutting concerns** — logic that applies to many routes — in one place, without duplicating it in every controller. For example, if you want to log every request, you write one middleware and apply it globally rather than adding a `console.log` to every controller method.

### Creating Middleware

```typescript
// middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // This runs BEFORE the route handler
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    next(); // ← IMPORTANT: Must call next() to pass to the next handler
  }
}
```

Key points:
- Implements `NestMiddleware` interface, which requires a `use()` method.
- The `next()` function **must** be called, otherwise the request hangs forever.
- The `@Injectable()` decorator allows it to receive injected dependencies (e.g., a logging service).

### Applying Middleware

Middleware is applied in the **module** using the `configure()` method:

```typescript
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');  // Apply to ALL routes
  }
}
```

#### Targeting Specific Routes

```typescript
configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes('users');  // Only /users routes
}
```

#### Targeting Specific Routes and Methods

```typescript
import { RequestMethod } from '@nestjs/common';

configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes({ path: 'users', method: RequestMethod.GET });
}
```

#### Using Controller Class as Target

```typescript
configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes(UsersController);  // All routes in UsersController
}
```

> **Your note:** _"In app.module we export AppModule that implements NestModule."_
>
> Small correction: `AppModule` does not `export` anything here — it **implements** the `NestModule` **interface** from `@nestjs/common`. Implementing an interface means `AppModule` promises to have a `configure()` method. This is TypeScript's way of enforcing a contract.

---

## 14. Building a Complete User Module — Step by Step

Let's put everything together and build a fully functional `UsersModule`.

### Step 1 — Define the User Type

```typescript
// users/users.type.ts (or users/user.entity.ts)

// Option A: Interface (for simple type checking)
export interface User {
  id: number;
  name: string;
  email: string;
}

// Option B: Class (recommended for DTOs with validation)
export class CreateUserDto {
  name: string;
  email: string;
}
```

### Step 2 — Create the Service

```typescript
// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.type';
import { CreateUserDto } from './users.type';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  create(dto: CreateUserDto): User {
    const user: User = { id: this.idCounter++, ...dto };
    this.users.push(user);
    return user;
  }

  update(id: number, dto: Partial<CreateUserDto>): User {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    this.users.splice(index, 1);
  }
}
```

### Step 3 — Create the Controller

```typescript
// users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateUserDto>) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.usersService.remove(+id);
    return { message: 'Deleted successfully' };
  }
}
```

### Step 4 — Create the Module

```typescript
// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],    // Export if other modules need UsersService
})
export class UsersModule {}
```

> **Your note:** _"In user.module we put the service in export if another module wants to use that service because by default everything related to a module is private for it."_
>
> **Correct!** Without `exports: [UsersService]`, if `AuthModule` tries to inject `UsersService`, NestJS will throw an error at startup saying the provider is not found.

### Step 5 — Register in Root Module

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],   // ← Register your feature module here
})
export class AppModule {}
```

### Final File Structure

```
src/
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── users.type.ts
├── middleware/
│   └── logger.middleware.ts
├── app.module.ts
└── main.ts
```

---

## 15. Summary

NestJS is an opinionated TypeScript backend framework that wraps Express.js with a structured, Angular-inspired architecture:

- **Modules** (`@Module`) organize your app into cohesive feature areas.
- **Controllers** (`@Controller`) handle routing and request extraction.
- **Services** (`@Injectable`) hold business logic and are injected via DI.
- **Decorators** (`@Get`, `@Body`, `@Param`, etc.) configure routing and data binding declaratively.
- **The IoC Container** manages the lifecycle of services as singletons.
- **Middleware** (`NestMiddleware`) runs before route handlers for cross-cutting concerns.
- **Built-in exceptions** (`NotFoundException`, etc.) remove boilerplate error handling.
- Module **exports** control the visibility of providers across module boundaries.

The key mental model shift from Express: **you stop writing route-by-route procedural code and instead declare your intentions with decorators and let NestJS wire everything together.**

---

## 16. Quick Revision Notes

- `@Controller('path')` → sets base URL for all routes in the class.
- `@Get()`, `@Post()`, `@Put()`, `@Delete()` → bind a method to an HTTP verb + optional sub-path.
- `@Body()` → extracts JSON body from the request.
- `@Param('name')` → extracts a URL parameter. **Always a string — convert with `+id`.**
- `@Query('name')` → extracts a query string parameter.
- `@Injectable()` → marks a class as a provider; enables DI.
- Services are **singletons** — one instance shared across all consumers.
- Modules are **private by default** — use `exports` to share providers.
- `@Module({ imports, controllers, providers, exports })`.
- `AppModule` is the **root module** — all feature modules must be registered here.
- `NestMiddleware` requires a `use(req, res, next)` method; **always call `next()`**.
- `configure()` in `NestModule` applies middleware; use `.forRoutes()` to target specific routes.
- Throw `NotFoundException`, `BadRequestException`, etc. from `@nestjs/common` — NestJS formats the response automatically.
- Route params are always **strings**. Use the unary `+` operator (`+id`) to convert to number.
- `interface` merges on duplicate declaration; `type` does not; `class` exists at runtime.

---

## 17. Potential Interview / Exam Questions

**Q1: What is the difference between a Controller and a Service in NestJS?**

> A **Controller** handles HTTP routing — it receives requests, extracts data (`@Body`, `@Param`, etc.), and returns responses. It should contain **no business logic**. A **Service** contains the business logic, database operations, and computations. Controllers call services; services never call controllers.

---

**Q2: What does `@Injectable()` do?**

> It marks a class as a **provider** that can be managed by NestJS's IoC container. This allows NestJS to create, manage, and inject instances of that class into other classes that declare it as a constructor dependency.

---

**Q3: What is Dependency Injection and why is it useful?**

> DI is a pattern where a class receives its dependencies from an external source rather than creating them itself. It promotes loose coupling (classes don't depend on concrete implementations), improves testability (you can inject mocks), and simplifies lifecycle management (the container handles instantiation).

---

**Q4: What is the purpose of the `exports` array in `@Module()`?**

> By default, all providers in a module are **private** to that module. Adding a provider to `exports` makes it available to any other module that imports this module. Without exporting, another module cannot inject that provider even if it imports the module.

---

**Q5: How do you read a URL parameter in NestJS? What is a common mistake?**

> Use `@Param('paramName')` decorator on a controller method parameter. The common mistake is forgetting that URL parameters are **always strings**. If your service expects a number, you must convert: `+id` or `parseInt(id, 10)`.

---

**Q6: What is the difference between `@Param()` and `@Query()`?**

> `@Param('id')` reads **route parameters** defined with `:id` in the URL path (e.g., `/users/42`). `@Query('page')` reads **query string parameters** that come after `?` in the URL (e.g., `/users?page=2`).

---

**Q7: Why does NestJS use the singleton pattern for services?**

> Singletons ensure that there is only **one instance** of a service per module scope. This saves memory, ensures consistent state, and avoids the overhead of re-instantiating services on every request. The IoC container creates the instance once at startup and reuses it for all injections.

---

**Q8: What does `NestMiddleware` require, and why must you call `next()`?**

> `NestMiddleware` requires implementing a `use(req, res, next: NextFunction)` method. You **must** call `next()` at the end to pass control to the next handler in the chain. If you don't, the request will hang and the client will never receive a response.

---

**Q9: What is the difference between `type`, `interface`, and `class` in TypeScript?**

> - `type`: A type alias. Cannot be declared twice. Does not exist at runtime.
> - `interface`: Supports declaration merging (same name = merged). Does not exist at runtime.
> - `class`: Exists at runtime. Can have methods, constructors, and default values. Required for NestJS validation with `class-validator`.

---

**Q10: What happens if you don't import a feature module into `AppModule`?**

> NestJS will not discover that module's controllers or providers. The routes defined in its controllers will not be registered, and attempting to inject its providers will result in a runtime error at startup.

---

_End of Study Guide_
