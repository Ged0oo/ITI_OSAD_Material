# Stack Implementation in C++

This project provides a simple stack implementation in C++ **without using STL containers**.  
It demonstrates manual dynamic memory management, boundary checking, and stack operations.

---

## Features

- Push elements onto the stack  
- Pop elements from the stack  
- Peek at the top element  
- Check if the stack is empty  
- Check if the stack is full  
- Dynamically allocated memory (no STL used)  
- Includes a **complete test main file** covering:
  - Normal operations  
  - Edge cases  
  - Overflow / Underflow  
  - Randomized test scenario  

---

## Files in This Project

| File | Description |
|------|-------------|
| `stack.h` | Header containing Stack class definition |
| `stack.hpp` | Template implementation of stack methods |
| `main.cpp` | Runs full test suite for all stack features |
| `Makefile` | Builds the project |
| `README.md` | Documentation file (this file) |

---

## Stack Operations

### `push(T x)`
Adds a new element to the top of the stack.  
If the stack is full, prints an error message.

### `pop()`
Removes the top element from the stack and returns it.  
If the stack is empty, prints an error message and returns a default value.

### `peek()`
Returns the top element without removing it.  
If the stack is empty, prints an error message and returns a default value.

### `isEmpty()`
Returns `true` if the stack is empty, otherwise `false`.

### `isFull()`
Returns `true` if the stack is full, otherwise `false`.

### `print()`
Prints all stack elements from bottom to top.  
If the stack is empty, prints "Stack is empty.".

---

## Build & Run

```bash
make clean
make
./app
```

---

## Example Output

```
Stack content (bottom -> top): 10 20 30
Stack overflow.
Top element = 30
Popped: 30
Popped: 20
Popped: 10
Stack underflow.
```

---

## Notes

- Templates are fully implemented in header files to avoid linker errors.
- Manual memory management is used; no smart pointers or STL containers.
- Edge cases like stack overflow and underflow are handled with messages.
- The project is suitable for learning C++ templates and basic data structures.