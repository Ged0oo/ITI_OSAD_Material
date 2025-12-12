# Library Management System (Java Console Application)

A **fully functional**, **well-structured**, console-based **Library Management System** built entirely in Java.
Perfect for learning advanced OOP, clean architecture, separation of concerns, and real-world CRUD + borrowing logic.

## Requirements Covered:

| Requirement                                   | Status | Implementation Detail |
|-----------------------------------------------|:------:|-----------------------|
| 1. Design LibraryItem Hierarchy (OOP)         | ✅    | `LibraryItem` (Abstract), `Book`, `Magazine` (Inheritance, Polymorphism). |
| 2. Custom Exception Handling                  | ✅    | `ItemNotFoundException` is thrown when accessing non-existent items. |
| 3. Library Class Management (Generics)        | ✅    | `Library` class uses `HashMap<String, LibraryItem>` and generic method `<T extends LibraryItem> T getItem(String id)`. |
| 4. Client Class Hierarchy                     | ✅    | `Client` class with `id`, `name`, `email`, and `getClientDetails()`. |
| 5. Menu System for CRUD (Items & Clients)     | ✅    | Implemented via `ItemController` and `ClientController`. |
| 6. Main Method Demonstration                  | ✅    | `LibraryManagementSystem` initializes data and runs the menu loop. |
| **Additional 1: Client-Item Relation** | ✅    | `Library.clientBorrowedItems` tracks item IDs per client ID. |
| **Additional 2: Borrow/Return Feature** | ✅    | `Library.countItemCopies` tracks stock. `borrowItem` and `returnItem` methods implemented. |
| **Additional 3: Use of Streams** | ✅    | Used in `LibraryOperationsController` for displaying available copies and all borrowed items. |
| **Additional 4: Validations** | ✅    | `Validation` class ensures unique IDs, proper formats (Regex for ID, Phone, Email), and item availability checks. |
| **Bonus 5: Interfaces** | ✅    | `CrudInterface` is implemented by both `LibraryItem` and `Client`. |
| **Bonus 6: User-Friendly Menu** | ✅    | `Ui` class provides clear menus, headers, and friendly error messages. |

## Features

- Complete CRUD for **Books** and **Magazines**
- Complete CRUD for **Clients**
- **Borrow / Return system** with copy-count tracking
- View available copies, client borrowing history, global borrowing status
- Strong input validation using regex
- Custom exception handling
- Clean, layered architecture (almost MVC)
- Pre-loaded sample data for instant testing

## Detailed Project Structure & Architecture

```

src/
├── library/
│   ├── exceptions/
│   │   └── ItemNotFoundException.java          Custom checked exception
│   │
│   model/                                      Domain models & contracts
│   │   ├── CrudInterface.java                  Standard CRUD contract
│   │   ├── LibraryItem.java                    Abstract base class (polymorphism)
│   │   ├── Book.java                           Concrete item type
│   │   ├── Magazine.java                       Concrete item type
│   │   └── Client.java                         Client entity (also implements CRUD)
│   │
│   └── service/                                Business logic layer
│       ├── Library.java                        Core library operations (items, copies, borrowing)
│       └── ClientManager.java                  Client CRUD & storage
│
├── main/
│   ├── controller/                             User interaction & flow control
│   │   ├── BaseController.java                 Abstract controller with shared dependencies
│   │   ├── ItemController.java                 Handles all item operations
│   │   ├── ClientController.java             Handles all client operations
│   │   └── LibraryOperationsController.java    Handles borrow/return & reports
│   │
│   ├── ui/                                     Pure presentation layer
│   │   └── Ui.java                             Menus, headers, screen clearing, prompts
│   │
│   ├── validation/                             Cross-cutting concern
│   │   └── Validation.java                     Reusable regex-based input validation
│   │
│   └── LibraryManagementSystem.java            Application entry point & composition root

```

### Layer Responsibilities (Clean Architecture Style)

| Layer           | Package / Responsibility                                                                 | Key Classes                          |
|-----------------|------------------------------------------------------------------------------------------|--------------------------------------|
| **Model** | `library.model` - Domain entities, contracts, inheritance hierarchy                        | `LibraryItem`, `Book`, `Magazine`, `Client` |
| **Service** | `library.service` - Business rules, data storage (in-memory, HashMap), borrowing logic    | `Library`, `ClientManager`           |
| **Controller** | `main.controller` - Orchestrates user flow, input handling, calls services, delegates to UI| All `*Controller` classes            |
| **UI** | `main.ui` - Pure output, no business logic, only formatting and screen control              | `Ui`                                 |
| **Validation** | `main.validation` - Input sanitization and format enforcement                                | `Validation`                         |


This separation makes the code **highly maintainable**, **testable**, and **extensible**.


## OOP Principles & Design Patterns Applied

| Principle / Pattern          | How It’s Implemented                                                                                     | Example |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------| ------- |
| **Inheritance** | `Book` and `Magazine` inherit common fields/methods from `LibraryItem`                                   | `id`, `title`, `getItemDetails()` |
| **Polymorphism** | `LibraryItem` reference can hold `Book` or `Magazine` → uniform handling in collections. The `update()` method is overridden in subclasses. | `List<LibraryItem>` |
| **Abstraction** | `LibraryItem` is an **abstract class** with the `abstract String getItemDetails()` method. `CrudInterface` is an interface. | Forces subclasses to implement details |
| **Encapsulation** | All fields private + public getters/setters                                                              | Standard JavaBeans pattern |
| **Interface Segregation** | **Bonus 5:** `CrudInterface` defines CRUD methods, implemented by both `Client` and `LibraryItem`. | Implemented by `Client` and `LibraryItem` |
| **Generics** | **Requirement 3:** Used in `Library.getItem(String id)` to return a specific subclass (`<T extends LibraryItem> T`). | `Library.getItem<Book>("...")` |
| **Wildcards** | While not strictly necessary for the current methods, the structure allows methods like `void processItems(List<? extends LibraryItem> items)` (Though simple list iteration is currently used). | Potential for future extension |
| **Dependency Injection** | Controllers receive dependencies via constructor (`Scanner`, `Library`, `ClientManager`, `Ui`, `Validation`). | Loose coupling |
| **Composition** | The `LibraryManagementSystem` class **has-a** `Library` and **has-a** `ClientManager`. | Better than using static methods |

## Methodologies & Best Practices Followed

| Methodology / Practice               | Implementation Details |
|--------------------------------------|------------------------|
| **Separation of Concerns** | 5 distinct packages/layers (Model, Service, Controller, UI, Validation). |
| **Java Streams** | **Additional 3:** Used in `LibraryOperationsController` to iterate and display item copies and client borrowed history efficiently. |
| **Exception Handling** | **Requirement 2:** `ItemNotFoundException` is explicitly thrown and caught in controllers (e.g., `ItemController`, `LibraryOperationsController`). |
| **Validation (Regex)** | **Additional 4:** `Validation` class uses Regular Expressions for strict checking of IDs (6 digits), Phone (11 digits), and Email formats. |
| **In-Memory Persistence** | `HashMap`-based storage in `Library` and `ClientManager` provides fast $O(1)$ lookups and modifications. |
| **User Experience (UX)** | **Bonus 6:** `Ui.clearScreen()`, descriptive menus, and `Ui.pressEnterToContinue()` for flow control. |

## Sample Data Loaded on Startup

| Type     | ID      | Title / Name                    | Details                              |
|--------|---------|----------------------------------|--------------------------------------|
| Book   | 200124  | Headway OOP Fundamentals         | Author: Mohamed Nagy, **Copies: 5** |
| Book   | 200126  | Grokking Algorithms              | Author: Tamer Hosny, **Copies: 5** |
| Magazine|200125  | New World Challanges                       | Issue #45, **Copies: 3** |
| Client | 190190  | Mohamed Nagy                     | Phone: 01553158667                   |
| Client | 180180  | Mohamed Abotrika                      | Phone: 01507060329                   |
