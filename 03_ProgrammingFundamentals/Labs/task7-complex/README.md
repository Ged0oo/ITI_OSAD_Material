# Complex Class (C++)

## Overview
This project implements a `Complex` class in C++ that represents complex numbers and supports arithmetic operations, comparisons, and utility functions. The class is modular and split into `.h` and `.cpp` files.
 
## Features
- Constructors: default, parameterized, copy, and move
- Destructor
- Setters and getters for real and imaginary parts
- Arithmetic operations: addition, subtraction, multiplication, division
- Overloads for `int + Complex` and `Complex + int`
- Comparison operators (`==`, `!=`)
- Output streaming (`operator<<`) for easy printing
- Utility functions: magnitude, angle, and display

## Files
### 1. complex.h
- Contains the `Complex` class declaration.
- Declares constructors, destructor, setters/getters, operator overloads, and utility functions.

### 2. complex.cpp
- Implements all the functions declared in `complex.h`.
- Handles memory management and operator logic.

### 3. main.cpp
- Example usage of the `Complex` class.
- Demonstrates arithmetic operations, comparisons, and printing.

## Compilation
Use g++ or any C++ compiler:
```
g++ main.cpp ./complex/complex.cpp && ./a.out
```