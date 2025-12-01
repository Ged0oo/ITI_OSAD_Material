# Picture Drawing Application in C++

## Overview

This project demonstrates a simple **graphics-like system** in C++ that allows creating and drawing multiple shapes (`Line`, `Rectangle`, `Circle`) using **object-oriented programming** concepts like **abstraction, encapsulation, inheritance, and polymorphism**.

The `Picture` class can store multiple shapes and paint them using a unified interface, showcasing **generalization through polymorphism**.

This updated version supports **any number of shapes dynamically** without a fixed limit.

---

## Folder Structure

```
.
├── app
├── circle
│   ├── circle.cpp
│   └── circle.h
├── line
│   ├── line.cpp
│   └── line.h
├── main.cpp
├── picture
│   ├── picture.cpp
│   └── picture.h
├── point
│   ├── point.cpp
│   └── point.h
├── rect
│   ├── rect.cpp
│   └── rect.h
├── shape
│   ├── shape.cpp
│   └── shape.h
```

---

## Classes

### `Point`
- Represents a 2D point `(x, y)`.
- Methods:
  - `print_point()`: Prints the coordinates.

### `Shape` (Abstract Class)
- Base class for all shapes.
- Pure virtual method:
  - `draw()`: Draws the shape.
- Virtual destructor to ensure proper cleanup.

### `Line`, `Rect`, `Circle`
- Derived from `Shape`.
- Override `draw()` to print their specific representation.
- Store their geometry using `Point` objects and additional attributes (e.g., `radius` for `Circle`).

### `Picture`
- Stores multiple shapes dynamically using `std::vector<Shape*>`.
- Methods:
  - `addShape(Shape* sh)`: Adds a shape.
  - `paint()`: Draws all shapes.
- Destructor deletes all dynamically allocated shapes to avoid memory leaks.
- No fixed limit on the number of shapes.

---

## Generalization Concept

- `Picture` stores a **collection of `Shape*` pointers**, allowing it to hold any type of shape.
- **Polymorphism** ensures that `draw()` calls the correct derived class implementation.
- Adding new shapes (e.g., `Triangle`) does not require changing `Picture` code, demonstrating **generalization**.
- Supports multiple `Picture` instances independently.

---

## Compilation Instructions

Run the following command from the project root:

```bash
g++ main.cpp \
point/point.cpp \
shape/shape.cpp \
line/line.cpp \
rect/rect.cpp \
circle/circle.cpp \
picture/picture.cpp \
-o picture
./picture
```

---

## Example Output

```
--- Picture Content ---
Line: (0, 0) -> (10, 10)
Rectangle: (2, 2) to (8, 6)
Circle: center (5, 5) radius=3
Line: (1, 1) -> (4, 5)
...
```


