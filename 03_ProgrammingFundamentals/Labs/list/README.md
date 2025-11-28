# Dynamic Type-Agnostic List in C++

This project demonstrates how to implement a dynamic list in C++ without
using STL containers.\
It stores objects of different derived types (`Integer`, `Float`,
`Character`, `String`) using a base polymorphic interface.

------------------------------------------------------------------------

## Features

-   Detects input type automatically (int, float, char, string)
-   Stores items in a custom dynamic array (no vector, no STL)
-   Supports auto-resizing (capacity doubling)
-   Uses polymorphism for printing and identifying types
-   Clean memory management (RAII-based destructor)

------------------------------------------------------------------------

## Project Structure

    Project/
    │
    ├── BaseType/
    │   ├── basetype.h
    │   └── basetype.cpp
    │
    ├── List/
    │   ├── List.h
    │   └── List.cpp
    │
    └── main.cpp

------------------------------------------------------------------------

## How It Works

### 1. `detectType()`

Determines whether the user input represents: - Integer - Float - Single
character - String

Then returns a pointer to the appropriate derived class instance.

### 2. `List` Class

A manually implemented dynamic array: - `basetype **data` - Expands
capacity when full - Owns and deletes all stored objects

### 3. Main Loop

Reads input from user, creates the correct type, and stores it in the
list.

------------------------------------------------------------------------

## Build Instructions

### Using g++:

    clear && make clean && make && ./app

------------------------------------------------------------------------

## 🧪 Example Interaction

    Enter anything.
    Type 'exit' to quit.

    Input: 6
    Input: Nagy
    Input: 4.16
    Input: A
    Input: exit

    Final List:
    0: 6 (int)
    1: Nagy (string)
    2: 4.16 (float)
    3: A (char)

------------------------------------------------------------------------

## Notes

-   No STL containers are used by requirement.
-   Type detection relies on `stoi` and `stof`.

