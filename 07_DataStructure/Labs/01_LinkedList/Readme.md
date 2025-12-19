# Doubly Linked List Lab Project – Detailed Project Structure

## Project Overview

This is a C++ template-based implementation of a doubly linked list, developed as **Lab 01** for the ITI Data Structures course.  
The project emphasizes **clean code organization**, **modularity**, and **proper separation of concerns** through a well-structured directory layout.

**Date**: December 19, 2025  
**Path**: `~/Mine/ITI/07_DataStructure/Labs/01_LinkedList`

## Complete Directory Tree
```text
.
├── Linkedlist
│   ├── Linkedlist.h    # Class definition
│   └── Linkedlist.hpp  # Template implementation
├── Node
│   ├── Node.h          # Node definition
│   └── Node.hpp        # Node implementation
├── main.cpp            # Driver code / Testing
└── Makefile            # Compilation script
```

**Statistics**  
- **7 directories**  
- **8 source/header files**  
- Clear separation between source code and build output

## Detailed Breakdown of Each Component

### Root Level Files

- **`main.cpp`**  
  The main driver program. Instantiates a `Linkedlist<string>`, performs insertions, queries, modifications, and prints results.

- **`Makefile`**  
  Handles compilation rules, dependencies, object file placement in `build/Debug/`, and linking into the final executable.

### `Node/` Directory

Contains everything related to the individual node of the doubly linked list.

- **`Node.h`**  
  - Template class declaration  
  - Public members: `val`, `next`, `prev`  
  - Constructor declaration  
  - Includes `Node.hpp` at the end (standard template pattern)

- **`Node.hpp`**  
  - Defines the constructor implementation  
  - Initializes `val`, sets `next` and `prev` to `nullptr`

### `Linkedlist/` Directory

Fully encapsulates the linked list logic.

- **`Linkedlist.h`**  
  - Includes `../Node/Node.h` (relative path to access Node class)  
  - Declares `head` and `tail` pointers  
  - Declares all public methods (insert, remove, print, etc.)  
  - Includes `Linkedlist.hpp` at the end

- **`Linkedlist.hpp`**  
  - Contains full implementations of all template methods  
  - Handles edge cases (empty list, head/tail updates, etc.)

### `build/Debug/` Directory

- Stores all intermediate object files after compilation.
- Keeps the source directories clean and separates source from binaries.
- Contains objects for `main`, `Node`, `Linkedlist`, and an additional `Stack` object (possibly from another exercise).

### `app/` Directory

- Currently empty.
- Likely reserved for future expansion (e.g., placing the final executable or building a small application on top of the data structure).

## Key Structural Design Decisions

- **Modular Class Directories**  
  Both `Node` and `Linkedlist` have their own folders → promotes reusability and clear ownership.

- **Template Separation (`.h` + `.hpp`)**  
  Follows best practices for C++ templates: declarations in `.h`, definitions in `.hpp`, included at the bottom of the header.

- **Relative Include Paths**  
  Uses `../Node/Node.h` and `./Linkedlist.hpp` → makes the project portable and self-contained.

- **Build Artifact Isolation**  
  All `.o` files go into `build/Debug/` → source tree remains clean.

- **Minimal Root Clutter**  
  Only essential files (`main.cpp`, `Makefile`) reside at the root.
