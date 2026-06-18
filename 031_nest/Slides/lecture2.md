# NestJS — Lecture 2 Study Guide
## DTOs, Validation, TypeORM, Guards, Interceptors & the Full Request Lifecycle

> _Transformed from lecture notes into a complete reference for studying and revision._
> _Builds directly on Lecture 1. Review that guide first if needed._

---

## Table of Contents

1. [Data Transfer Objects (DTOs)](#1-data-transfer-objects-dtos)
2. [Pipes — Validation and Transformation](#2-pipes--validation-and-transformation)
3. [Zod — An Alternative Validation Approach](#3-zod--an-alternative-validation-approach)
4. [Connecting to a Database with TypeORM](#4-connecting-to-a-database-with-typeorm)
5. [Entities — Mapping Classes to Database Tables](#5-entities--mapping-classes-to-database-tables)
6. [forRoot vs forFeature](#6-forroot-vs-forfeature)
7. [The Repository Pattern](#7-the-repository-pattern)
8. [Common TypeORM Repository Methods](#8-common-typeorm-repository-methods)
9. [NestJS CLI — Generating Resources](#9-nestjs-cli--generating-resources)
10. [Guards — Authorization](#10-guards--authorization)
11. [Interceptors](#11-interceptors)
12. [The Complete Request Lifecycle](#12-the-complete-request-lifecycle)
13. [Putting It All Together — Full Working Example](#13-putting-it-all-together--full-working-example)
14. [Summary](#14-summary)
15. [Quick Revision Notes](#15-quick-revision-notes)
16. [Potential Interview / Exam Questions](#16-potential-interview--exam-questions)

---

## 1. Data Transfer Objects (DTOs)

### What is a DTO?

A **Data Transfer Object (DTO)** is a plain class that defines the **shape of data flowing into or out of your API**. It acts as a contract between the client and your application.

Think of it as a form with specific fields — the client must fill in exactly those fields, nothing more, nothing less.

### Why Not Just Use the Entity Directly?

Your notes correctly identify two purposes:

1. **Hide sensitive fields** — Your database `User` entity might have fields like `passwordHash`, `createdAt`, `internalRole`, `deletedAt`. You never want to expose these to the client. A DTO exposes only what the client needs.

2. **Validation** — You can attach validation rules to DTO fields (e.g., "this must be a non-empty string", "this must be a valid email") so bad data is rejected before it ever reaches your service.

```
Client sends JSON  →  DTO validates it  →  Service receives clean data  →  Entity saves to DB
```

### Without DTO (dangerous):

```typescript
// ❌ The client could send any fields, including ones you don't expect
@Post()
create(@Body() body: any) {
  return this.usersService.create(body); // No shape, no validation
}
```

### With DTO (safe):

```typescript
// ✅ Only the fields defined in CreateUserDto are accepted
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```

### Installing the Required Packages

Your notes mention two packages to install:

```bash
npm install class-validator class-transformer
```

- **`class-validator`** — Provides decorators like `@IsString()`, `@IsEmail()`, `@IsInt()` to validate fields.
- **`class-transformer`** — Transforms plain JSON objects into class instances so that validation decorators can run against them.

> Both are needed together. `class-validator` defines the rules; `class-transformer` enables NestJS to apply those rules to incoming JSON.

### Creating a DTO

```
src/
└── users/
    └── dtos/
        ├── create-user.dto.ts
        └── update-user.dto.ts
```

```typescript
// users/dtos/create-user.dto.ts
import { IsString, IsEmail, IsInt, Min, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsOptional()       // ← This field is not required
  bio?: string;
}
```

Every field decorated with a validator is **required by default**. To make a field optional, add `@IsOptional()` above the other decorators.

### Using the DTO in the Service

```typescript
// users/users.service.ts
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  // The function now expects only the DTO fields, not the full User entity
  create(dto: CreateUserDto): User {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }
}
```

### Deep Understanding — Why Use a Class, Not an Interface?

Validation decorators from `class-validator` rely on **TypeScript metadata** that only exists at runtime for **classes**. An `interface` is erased after compilation and cannot carry metadata. A `class` exists at runtime, so decorators can attach rules to its properties and `class-transformer` can instantiate it from plain JSON.

---

## 2. Pipes — Validation and Transformation

### What is a Pipe?

A **Pipe** is a class decorated with `@Injectable()` that implements the `PipeTransform` interface. It runs **after** middleware and guards but **before** the controller handler receives the data.

Pipes have two main jobs:

| Job | Description | Example |
|---|---|---|
| **Transformation** | Convert input data to the expected type | String `"42"` → Number `42` |
| **Validation** | Check the data against rules; throw if invalid | Reject missing required fields |

### Built-in NestJS Pipes

NestJS ships with several ready-to-use pipes:

| Pipe | Purpose |
|---|---|
| `ValidationPipe` | Validates request body against a DTO class |
| `ParseIntPipe` | Converts a string to an integer |
| `ParseFloatPipe` | Converts a string to a float |
| `ParseBoolPipe` | Converts `"true"`/`"false"` to boolean |
| `ParseUUIDPipe` | Validates that a string is a valid UUID |
| `ParseArrayPipe` | Parses a comma-separated string into an array |
| `DefaultValuePipe` | Provides a default value if input is undefined |

### Enabling Global Validation with `ValidationPipe`

Go to `main.ts` and add one line:

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply ValidationPipe to every route in the entire application
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
```

Now, whenever a request body is typed as a DTO class (e.g., `CreateUserDto`), NestJS automatically:
1. Transforms the raw JSON into a `CreateUserDto` instance.
2. Runs all `class-validator` decorators on it.
3. If any rule fails, returns a `400 Bad Request` automatically — no code needed from you.

**Example of automatic error response when validation fails:**

```json
{
  "statusCode": 400,
  "message": [
    "name must be a string",
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

### `ValidationPipe` Useful Options

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,        // Strip fields not in the DTO (ignore extra fields)
  forbidNonWhitelisted: true, // Throw error if extra fields are sent
  transform: true,        // Auto-transform payloads to DTO class instances
}));
```

- **`whitelist: true`** is highly recommended — it prevents clients from injecting unexpected fields.

### Using `ParseIntPipe` for Route Parameters

Recall from Lecture 1 that `@Param()` always returns a string. You previously converted with `+id`. With `ParseIntPipe`, NestJS handles this for you:

```typescript
// Before (manual conversion):
@Get(':id')
findOne(@Param('id') id: string) {
  return this.usersService.findOne(+id); // manual conversion
}

// After (using ParseIntPipe):
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.findOne(id); // already a number!
}
```

If the client passes a non-numeric value (e.g., `/users/abc`), `ParseIntPipe` automatically returns a `400 Bad Request` error.

### Making Fields Optional

Your notes mention using `@Optional()` — the correct decorator from `class-validator` is `@IsOptional()`:

```typescript
import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;         // Required — must be sent

  @IsString()
  @IsOptional()
  bio?: string;         // Optional — can be omitted
}
```

> **Important:** `@IsOptional()` must come **after** the type decorator (`@IsString`) and the TypeScript type should use `?` to mark it as possibly undefined.

### Common `class-validator` Decorators

```typescript
// String validation
@IsString()           // Must be a string
@IsNotEmpty()         // Must not be empty string
@MinLength(3)         // Minimum 3 characters
@MaxLength(100)       // Maximum 100 characters
@IsEmail()            // Must be a valid email address
@IsUrl()              // Must be a valid URL
@Matches(/regex/)     // Must match a regular expression

// Number validation
@IsInt()              // Must be an integer
@IsNumber()           // Must be a number (int or float)
@Min(0)               // Minimum value
@Max(120)             // Maximum value
@IsPositive()         // Must be > 0

// Other
@IsBoolean()          // Must be true or false
@IsEnum(MyEnum)       // Must be a value from an enum
@IsOptional()         // Field is not required
@IsArray()            // Must be an array
@IsUUID()             // Must be a UUID string
```

### Where Pipes Sit in the Lifecycle

```
Request → Middleware → Guards → [PIPES] → Controller → Service → Response
```

This means: by the time your controller method runs, the data has already been validated and transformed.

### Deep Understanding — How `ValidationPipe` Works Internally

1. A request arrives with a JSON body.
2. NestJS sees the controller method expects a `CreateUserDto`.
3. `class-transformer` converts the raw plain object `{ name: "Alice" }` into a real `CreateUserDto` instance.
4. `class-validator` reads the metadata attached to `CreateUserDto`'s fields (stored by decorators like `@IsString()`).
5. It runs each validation rule. If any fail, it collects all errors and throws a `BadRequestException`.
6. If all pass, the DTO instance is handed to the controller.

---

## 3. Zod — An Alternative Validation Approach

### What is Zod?

**Zod** is a TypeScript-first schema validation library. Instead of using decorators on classes, you define validation schemas as JavaScript objects:

```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0),
});

type CreateUserDto = z.infer<typeof CreateUserSchema>; // TypeScript type derived from schema
```

### Zod vs class-validator — Is It Instead of Pipes?

> **Your question:** _"Is Zod instead of pipes or what?"_

Zod is an **alternative** to `class-validator` + `class-transformer`. It is not a replacement for Pipes themselves — you still use a Pipe to hook validation into the NestJS lifecycle. The difference is what runs **inside** the pipe:

| Approach | Library | How it works |
|---|---|---|
| Decorator-based | `class-validator` + `class-transformer` | Decorators on class properties |
| Schema-based | `zod` | Schema objects defined separately |

To use Zod with NestJS you create a custom `ZodValidationPipe` that uses the Zod schema to validate the body, then apply it to your route.

**Which should you use?**

- **`class-validator`** is the **NestJS default and recommended approach**. It integrates seamlessly with `ValidationPipe` and the Swagger documentation generator.
- **Zod** is popular in the broader TypeScript ecosystem (used heavily with tRPC) and is preferred by some developers for its explicit, co-located schema definitions. NestJS supports it via the `nestjs-zod` package.

For your ITI course, stick with `class-validator` as it's what NestJS documentation recommends.

---

## 4. Connecting to a Database with TypeORM

### What is TypeORM?

**TypeORM** is an Object-Relational Mapper (ORM) for TypeScript and Node.js. An ORM lets you interact with your database using TypeScript classes and methods instead of writing raw SQL queries.

```typescript
// Without ORM (raw SQL):
await db.query('SELECT * FROM users WHERE id = $1', [id]);

// With TypeORM:
await this.userRepository.findOneBy({ id });
```

> **Your note:** _"ORM in express I guess"_ — Yes, this is the same concept as using `Sequelize` or `Prisma` in an Express app. TypeORM is NestJS's most commonly paired ORM, though Prisma is also very popular.

### Installing TypeORM for PostgreSQL

```bash
npm install @nestjs/typeorm typeorm pg
```

- **`@nestjs/typeorm`** — NestJS wrapper that integrates TypeORM with the module system.
- **`typeorm`** — The core TypeORM library.
- **`pg`** — The PostgreSQL driver (replace with `mysql2` for MySQL, `better-sqlite3` for SQLite).

### Configuring TypeORM in `AppModule`

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',           // Database type
      host: 'localhost',          // Database host
      port: 5432,                 // PostgreSQL default port
      username: 'postgres',       // DB username
      password: 'yourpassword',   // DB password
      database: 'nestjs_db',      // DB name
      autoLoadEntities: true,     // Auto-register entities added via forFeature()
      synchronize: true,          // Auto-create/update tables from entities (DEV ONLY)
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

### Important Options Explained

#### `autoLoadEntities: true`
When you register an entity in a feature module using `TypeOrmModule.forFeature([User])`, setting `autoLoadEntities: true` in `forRoot` means TypeORM automatically knows about it — you don't have to list every entity manually in `forRoot`.

> **Your note:** _"autoLoadEntities so there is no need for migrations I guess"_ — This is a slight mix-up. `autoLoadEntities` is about **entity discovery**, not migrations. The option that handles schema creation is `synchronize: true` (below).

#### `synchronize: true`
This tells TypeORM to **automatically create or update database tables** to match your entity classes every time the app starts.

> ⚠️ **WARNING: Never use `synchronize: true` in production.** It can drop columns and destroy data if you change an entity. In production, use **migrations** instead.

---

## 5. Entities — Mapping Classes to Database Tables

### What is an Entity?

An **Entity** is a TypeScript class decorated with `@Entity()` that maps to a database table. Each property of the class maps to a column.

> **Your note:** _"the name of the class will be the name of the table"_ — By default yes, TypeORM uses the class name (lowercased) as the table name. You can override this: `@Entity('custom_table_name')`.

### Creating a User Entity

```typescript
// users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')   // Table name: "users"
export class User {

  @PrimaryGeneratedColumn()
  id: number;       // Auto-incrementing primary key

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ select: false })  // Never returned in queries by default
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;  // Automatically set on creation

  @UpdateDateColumn()
  updatedAt: Date;  // Automatically updated on every save
}
```

### Column Decorators

| Decorator | Purpose |
|---|---|
| `@PrimaryGeneratedColumn()` | Auto-incrementing integer primary key |
| `@PrimaryGeneratedColumn('uuid')` | Auto-generated UUID primary key |
| `@Column()` | Regular column |
| `@Column({ unique: true })` | Column with unique constraint |
| `@Column({ nullable: true })` | Column that can be NULL |
| `@Column({ default: 0 })` | Column with a default value |
| `@Column({ select: false })` | Column excluded from `SELECT *` by default |
| `@CreateDateColumn()` | Auto-set timestamp on record creation |
| `@UpdateDateColumn()` | Auto-updated timestamp on every save |
| `@DeleteDateColumn()` | Soft-delete timestamp (for soft deletes) |

### Can You Use Validation Decorators on Entities?

> **Your note:** _"I think we can use pipes/validation here too or not correct?"_

**Not directly.** Validation decorators from `class-validator` (`@IsString()`, `@IsEmail()`, etc.) belong on **DTOs**, not entities. Entities are database mapping classes — they should not contain HTTP-layer concerns like validation.

The correct flow is:

```
Request Body → DTO (validated by ValidationPipe) → Service → Entity (saved to DB)
```

You validate data in the DTO **before** it touches the entity. The entity just describes the database structure.

---

## 6. forRoot vs forFeature

This is an important distinction your notes flag.

### `TypeOrmModule.forRoot()`

- Called **once**, in the **root `AppModule`**.
- Sets up the **database connection** for the entire application.
- Configures host, port, credentials, and global options.

```typescript
// app.module.ts — called once globally
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  // ...
})
```

### `TypeOrmModule.forFeature()`

- Called in **each feature module** that needs to work with specific entities.
- Registers specific entities and makes their **Repositories** available for injection in that module.

```typescript
// users/users.module.ts — called per feature
TypeOrmModule.forFeature([User])
```

### Analogy

Think of it like a restaurant:
- `forRoot` = Setting up the kitchen (one time, for the whole restaurant).
- `forFeature` = Assigning specific chefs to work with specific ingredients (per department).

### Full Picture

```typescript
// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({ ... }),   // ← Global DB connection
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}

// users/users.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([User])  // ← Makes UserRepository injectable here
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

## 7. The Repository Pattern

### What is a Repository?

A **Repository** is an object that acts as an interface between your service and the database. Instead of writing SQL queries, you call methods on the repository.

TypeORM provides a `Repository<T>` class for each entity, pre-loaded with common database operations.

### Injecting the Repository into a Service

```typescript
// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    //               ^^^^^^^^^^^^
    // TypeORM provides this — no need to create it manually
  ) {}
}
```

**What `@InjectRepository(User)` does:**
- Tells NestJS's DI container: _"inject the repository for the `User` entity here."_
- This works because `TypeOrmModule.forFeature([User])` registered it in the module.

### Why `@InjectRepository` and Not Just Constructor Injection?

Repositories are not plain classes — they are created by TypeORM, not by NestJS's own DI container. `@InjectRepository` is a bridge that lets NestJS know to ask TypeORM for the repository rather than trying to instantiate it itself.

---

## 8. Common TypeORM Repository Methods

> **Your note:** _"What are the other functions like create and find and findOneBy?"_

Here is a comprehensive reference:

### Finding Records

```typescript
// Get all users
const users = await this.userRepository.find();

// Get all users with a condition
const admins = await this.userRepository.find({
  where: { role: 'admin' }
});

// Get one user by a condition
const user = await this.userRepository.findOneBy({ id: 1 });

// Get one user with more complex options
const user = await this.userRepository.findOne({
  where: { email: 'alice@example.com' },
  select: ['id', 'name', 'email'], // Only return these fields
});

// Count records
const count = await this.userRepository.count({ where: { role: 'admin' } });
```

### Creating and Saving Records

```typescript
// Step 1: create() — builds an entity instance from plain data (does NOT save to DB)
const user = this.userRepository.create({ name: 'Alice', email: 'alice@example.com' });

// Step 2: save() — persists it to the database
const savedUser = await this.userRepository.save(user);

// Shortcut: save() alone also works on plain objects
const savedUser = await this.userRepository.save({ name: 'Alice', email: 'alice@example.com' });
```

> **Important distinction:** `create()` only builds the entity object in memory. `save()` actually writes to the database. You need both.

### Updating Records

```typescript
// Option 1: update() — updates fields by condition (does NOT return the updated entity)
await this.userRepository.update({ id: 1 }, { name: 'New Name' });

// Option 2: find → modify → save (returns the updated entity)
const user = await this.userRepository.findOneBy({ id: 1 });
user.name = 'New Name';
await this.userRepository.save(user);
```

### Deleting Records

```typescript
// Hard delete by ID
await this.userRepository.delete(1);

// Hard delete by condition
await this.userRepository.delete({ role: 'guest' });

// Soft delete (sets deletedAt, does not remove from DB)
await this.userRepository.softDelete(1);
```

### Complete Service with TypeORM

```typescript
// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto); // build instance
    return this.userRepository.save(user);         // persist to DB
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // throws if not found
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
  }
}
```

> **Note on `async`:** All TypeORM operations are asynchronous (they communicate with the database). Every method that calls a repository method must be `async` and must `await` the result.

---

## 9. NestJS CLI — Generating Resources

### What is `nest g resource`?

The NestJS CLI can generate an entire **resource** (a complete CRUD module) with a single command:

```bash
nest g resource users
```

This generates:

```
src/users/
├── users.controller.ts        ← Controller with all CRUD routes
├── users.controller.spec.ts   ← Unit tests for controller
├── users.module.ts            ← Module
├── users.service.ts           ← Service with all CRUD methods
├── users.service.spec.ts      ← Unit tests for service
└── dto/
    ├── create-user.dto.ts     ← Create DTO
    └── update-user.dto.ts     ← Update DTO (extends CreateUserDto)
```

The CLI also asks:
1. _What transport layer?_ → Choose **REST API**
2. _Generate CRUD entry points?_ → **Yes**

It will also automatically register the new module in `AppModule`.

### Other Useful CLI Commands

```bash
nest g module users         # Generate just a module
nest g controller users     # Generate just a controller
nest g service users        # Generate just a service
nest g middleware logger     # Generate middleware
nest g guard auth            # Generate a guard
nest g interceptor logging   # Generate an interceptor
nest g pipe validation       # Generate a pipe
```

The `g` is short for `generate`.

---

## 10. Guards — Authorization

### What is a Guard?

A **Guard** is a class decorated with `@Injectable()` that implements the `CanActivate` interface. It decides whether a request should proceed to the controller or be rejected.

Guards are primarily used for **authorization** — checking whether the authenticated user has permission to access a specific resource.

> **Key difference from Middleware:**
> - **Middleware** runs before guards and has no knowledge of which handler will process the request.
> - **Guards** have access to the `ExecutionContext`, which tells them exactly which controller and method will handle the request — enabling role-based decisions.

### What is `ExecutionContext`?

> **Your note:** _"it has access to ExecutionContext — what is this?"_

`ExecutionContext` is an object that provides information about the **current request's context**:

- Which controller class is handling it.
- Which method (handler) is going to run.
- The underlying request/response objects.
- Whether the transport is HTTP, WebSocket, gRPC, etc.

This lets a guard make decisions like: _"The method being called is `deleteUser`, which requires the `admin` role. Does this user have that role?"_

```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // context.switchToHttp() gives you HTTP-specific objects
    // .getRequest() returns the Express request object

    const token = request.headers['authorization'];
    return this.validateToken(token); // return true = allow, false = deny (403)
  }

  private validateToken(token: string): boolean {
    return token === 'valid-token'; // simplified — real apps verify JWTs
  }
}
```

If `canActivate` returns:
- `true` → Request proceeds to the controller.
- `false` → NestJS throws a `403 Forbidden` error automatically.

### Applying a Guard

#### To a single route:

```typescript
import { UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Delete(':id')
  @UseGuards(AuthGuard)   // ← Only this route is protected
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
```

#### To an entire controller:

```typescript
@Controller('users')
@UseGuards(AuthGuard)   // ← All routes in this controller are protected
export class UsersController { ... }
```

#### Globally (all routes):

```typescript
// main.ts
app.useGlobalGuards(new AuthGuard());
```

> **Your note:** `@UseGuards(new AuthGuard())` — You can pass an instance (`new AuthGuard()`) or just the class (`AuthGuard`). When you pass just the class, NestJS uses the DI container to instantiate it, which means the guard can itself receive injected dependencies. Passing `new AuthGuard()` bypasses DI. **Prefer passing the class** when your guard has dependencies.

### Role-Based Guard Example

```typescript
// guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Read the required roles from a custom @Roles() decorator on the handler
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // No roles required, allow everyone

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Set by an AuthMiddleware or AuthGuard earlier

    return requiredRoles.includes(user?.role);
  }
}
```

---

## 11. Interceptors

### What is an Interceptor?

An **Interceptor** is a class decorated with `@Injectable()` that implements the `NestInterceptor` interface. It can run logic **before AND after** a controller method executes.

This is the key difference from Middleware and Guards:

| Layer | Before handler | After handler |
|---|---|---|
| Middleware | ✅ | ❌ |
| Guard | ✅ (decision only) | ❌ |
| Interceptor | ✅ | ✅ |

### What Are Interceptors Used For?

- **Logging**: Log how long a request took.
- **Response transformation**: Wrap all responses in a `{ data: ... }` envelope.
- **Caching**: Return cached data instead of hitting the controller.
- **Exception mapping**: Convert certain errors to different error types.
- **Adding extra data**: Attach metadata to the response.

### How Interceptors Work — RxJS Observables

Interceptors use **RxJS** (Reactive Extensions for JavaScript). The `intercept()` method receives a `CallHandler` and must return an Observable.

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    console.log('Before handler...');

    return next
      .handle()                                // ← Calls the actual controller method
      .pipe(
        tap(() => {
          const duration = Date.now() - start;
          console.log(`After handler — took ${duration}ms`);
        }),
      );
  }
}
```

### Response Transformation Interceptor

A very common use case — wrap every response in a standard envelope:

```typescript
// interceptors/transform.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

Before: controller returns `{ id: 1, name: 'Alice' }`
After: client receives:
```json
{
  "success": true,
  "data": { "id": 1, "name": "Alice" },
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

### Applying an Interceptor

```typescript
// To a single method:
@Get()
@UseInterceptors(LoggingInterceptor)
findAll() { ... }

// To an entire controller:
@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController { ... }

// Globally:
// main.ts
app.useGlobalInterceptors(new TransformInterceptor());
```

---

## 12. The Complete Request Lifecycle

Your notes have this slightly out of order. Here is the **correct and complete** NestJS request lifecycle:

```
Incoming HTTP Request
         │
         ▼
┌─────────────────────┐
│     Middleware      │  Global → Module-level
│  (logger, CORS...)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       Guards        │  Global → Controller → Route
│  (authentication,   │  Returns true/false
│   authorization)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Interceptors     │  Global → Controller → Route
│  (before handler)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       Pipes         │  Global → Controller → Route → Parameter
│  (validation,       │
│   transformation)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Controller      │  Route handler method executes
│     Handler         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Service        │  Business logic / DB operations
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Interceptors     │  Run AGAIN on the way out
│  (after handler)    │  (response transformation, logging)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Exception Filters  │  Catch any unhandled exceptions
│  (if error thrown)  │  Format error responses
└──────────┬──────────┘
           │
           ▼
    Outgoing Response
```

> **Your note had:** `middleware → guards → pipes → interceptors → controller → services`
>
> **Correction:** The correct order is `middleware → guards → **interceptors** → **pipes** → controller → services`. Interceptors wrap pipes — they run before pipes on the way in, and after the handler on the way out.

### Summary Table

| Layer | Purpose | Runs when |
|---|---|---|
| Middleware | Pre-processing, logging, CORS | Before everything |
| Guards | Allow or deny the request | After middleware |
| Interceptors (pre) | Transform request, start timer | After guards |
| Pipes | Validate and transform input data | Just before handler |
| Controller | Route matching, call service | After all layers |
| Service | Business logic, DB access | Called by controller |
| Interceptors (post) | Transform response, log duration | After handler returns |
| Exception Filters | Format error responses | When exception thrown |

---

## 13. Putting It All Together — Full Working Example

Here is a complete, working `UsersModule` combining everything from both lectures:

### File Structure

```
src/
├── users/
│   ├── dtos/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── guards/
│   └── auth.guard.ts
├── interceptors/
│   └── logging.interceptor.ts
├── middleware/
│   └── logger.middleware.ts
├── app.module.ts
└── main.ts
```

### `main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.listen(3000);
}
bootstrap();
```

### `user.entity.ts`

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

### `dtos/create-user.dto.ts`

```typescript
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```

### `dtos/update-user.dto.ts`

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType makes all fields of CreateUserDto optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

### `users.service.ts`

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id);
  }
}
```

### `users.controller.ts`

```typescript
import {
  Controller, Get, Post, Put, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)   // Only admins can delete
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
```

### `users.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### `app.module.ts`

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nestjs_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

---

## 14. Summary

This lecture covered the full pipeline from raw HTTP request to database and back:

- **DTOs** define the shape and validation rules for incoming data, hiding internal entity details from the client.
- **`class-validator`** + **`class-transformer`** power DTO validation via decorators.
- **`ValidationPipe`** (registered globally in `main.ts`) enforces DTO rules on every request.
- **`ParseIntPipe`** replaces manual `+id` conversions for route parameters.
- **TypeORM** maps TypeScript classes to database tables and provides a repository API for CRUD without writing SQL.
- **`forRoot`** sets up the database connection globally; **`forFeature`** registers entities per module.
- **Repositories** are injected via `@InjectRepository(Entity)` and provide methods like `find`, `findOneBy`, `create`, `save`, `update`, `delete`.
- **Guards** (`CanActivate`) control access to routes based on roles/permissions using `ExecutionContext`.
- **Interceptors** (`NestInterceptor`) wrap handler execution to add logging, transform responses, or handle caching.
- The **correct request lifecycle** is: Middleware → Guards → Interceptors (pre) → Pipes → Controller → Service → Interceptors (post) → Exception Filters.

---

## 15. Quick Revision Notes

- Install validation: `npm install class-validator class-transformer`
- Install TypeORM: `npm install @nestjs/typeorm typeorm pg`
- DTOs hide DB fields + add validation. Use **classes**, not interfaces.
- `@IsString()`, `@IsEmail()`, `@IsInt()` — validation decorators on DTO fields.
- `@IsOptional()` — makes a DTO field not required.
- `app.useGlobalPipes(new ValidationPipe())` in `main.ts` → applies validation globally.
- `ValidationPipe({ whitelist: true })` → strips unknown fields from body.
- `@Param('id', ParseIntPipe)` → auto-converts string param to integer, no `+id` needed.
- `@Entity()` → marks a class as a DB table. `@Column()` → marks a property as a column.
- `@PrimaryGeneratedColumn()` → auto-increment primary key.
- `synchronize: true` → auto-creates tables. **Never use in production.**
- `autoLoadEntities: true` → no need to manually list entities in `forRoot`.
- `forRoot` = global DB connection (once, in `AppModule`).
- `forFeature([Entity])` = register entities per module (in feature module).
- `@InjectRepository(Entity)` → inject TypeORM repository into a service.
- `repository.create(dto)` → builds entity in memory (no DB write).
- `repository.save(entity)` → writes to DB (INSERT or UPDATE).
- `repository.findOneBy({ id })` → find by condition.
- `repository.delete(id)` → hard delete.
- Guards implement `CanActivate` → return `true` (allow) or `false` (403 Forbidden).
- `ExecutionContext` → gives guards/interceptors info about the current handler.
- Interceptors implement `NestInterceptor` → run before AND after handler.
- `nest g resource users` → generates full CRUD module in one command.
- Correct lifecycle: **Middleware → Guards → Interceptors → Pipes → Controller → Service**.

---

## 16. Potential Interview / Exam Questions

**Q1: What is a DTO and why do we use it instead of the entity directly?**

> A DTO (Data Transfer Object) is a class that defines exactly what data the client is allowed to send or receive. We use it instead of the entity directly because: (1) entities may contain sensitive fields (passwords, internal flags) we never want to expose; (2) DTOs allow attaching validation rules (`@IsEmail()`, etc.) at the HTTP layer, keeping the entity clean; (3) it provides a stable API contract separate from the database schema.

---

**Q2: What is the difference between `create()` and `save()` in TypeORM?**

> `create()` builds an entity instance from a plain object **in memory** — it does not touch the database. `save()` persists the entity to the database (INSERT if new, UPDATE if it has an existing ID). You typically call `create()` first to get a properly typed entity, then `save()` to write it.

---

**Q3: What is `forRoot` vs `forFeature` in TypeORM module configuration?**

> `TypeOrmModule.forRoot()` is called once in `AppModule` to set up the global database connection. `TypeOrmModule.forFeature([Entity])` is called in each feature module to register specific entities and make their repositories injectable within that module.

---

**Q4: What does `synchronize: true` do and why is it dangerous in production?**

> `synchronize: true` tells TypeORM to automatically create or alter database tables to match your entity definitions every time the app starts. In development this is convenient, but in production it can **silently drop columns or tables** when you change an entity, causing irreversible data loss. In production, use database migrations instead.

---

**Q5: What is the difference between a Guard and Middleware?**

> Both run before the route handler, but they serve different purposes. Middleware runs very early, has no knowledge of which handler will run, and is used for general processing (logging, CORS). Guards run after middleware, have access to `ExecutionContext` (which tells them exactly which controller and method will handle the request), and are specifically designed for authorization decisions — returning `true` or `false`.

---

**Q6: What is `ExecutionContext` in NestJS?**

> `ExecutionContext` is an object passed to Guards and Interceptors that provides context about the current request's execution: which controller class is handling it, which method will run, and the underlying HTTP request/response objects. This allows guards to make handler-specific decisions (e.g., "this handler requires admin role").

---

**Q7: What is an Interceptor and what can it do that Middleware cannot?**

> An Interceptor can run logic **both before and after** the route handler executes, whereas Middleware only runs before. This makes Interceptors suitable for measuring response time, transforming the response format, implementing caching (return cached data instead of calling the handler), and mapping exceptions.

---

**Q8: Why must service methods that use TypeORM repositories be `async`?**

> Database operations are I/O bound — they take time because they communicate over a network to the database server. TypeORM repository methods return `Promise`s. If you don't `await` them, your function returns immediately with an unresolved Promise instead of the actual data. Making the function `async` allows you to `await` each database call and return real values.

---

**Q9: What does `@InjectRepository(User)` do?**

> It tells NestJS's DI container to inject the TypeORM `Repository<User>` instance for the `User` entity into this constructor parameter. This is necessary because repositories are managed by TypeORM, not by NestJS's own container, so this decorator acts as a bridge between the two systems.

---

**Q10: What is `PartialType` and why is it useful for update DTOs?**

> `PartialType(CreateUserDto)` from `@nestjs/mapped-types` creates a new class where all fields of `CreateUserDto` become optional. This is useful for `UpdateUserDto` because when updating a resource, clients typically only send the fields they want to change — not all required fields. Without `PartialType`, you'd have to duplicate and manually mark every field optional.

---

_End of Lecture 2 Study Guide_
