# Dynamic Type-Agnostic List in C++

This project demonstrates how to implement a dynamic, type‑agnostic list
in C++ **without using STL containers**.\
It stores objects of multiple derived types (`Integer`, `Float`,
`Character`, `String`) using runtime polymorphism and a custom dynamic
array.

------------------------------------------------------------------------

## Features

-   Automatic type detection for user input (int, float, char, string)

-   Custom dynamic list implementation (no vector, no STL)

-   Overloaded `add()` allowing:

    ``` cpp
    lst.add(3);
    lst.add("Nagy");
    lst.add(4.5f);
    lst.add('B');
    ```

-   Supports dynamic resizing (capacity doubling)

-   Polymorphic printing through virtual methods

-   Proper memory cleanup with a custom destructor

-   Safe manual pointer expansion using `new` and `delete[]`

------------------------------------------------------------------------

## 📂 Project Structure

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

Parses input and determines whether it is: - Integer\
- Float\
- Single character\
- String

Then creates and returns the appropriate derived object: `Integer`,
`Float`, `Character`, or `String`.

### 2. `List` Class

A manually implemented dynamic array storing:

    basetype** data

Each element is a pointer to a polymorphic object.\
When capacity is reached, the list doubles its size.

### 3. Direct Add Overloads

The list supports raw input without manually creating objects:

``` cpp
lst.add(3);
lst.add("Nagy");
lst.add(4.5f);
lst.add('B');
```

Internally, these map to:

``` cpp
add(new Integer(v));
add(new String(v));
add(new Float(v));
add(new Character(v));
```

------------------------------------------------------------------------

## Build Instructions

### Using Makefile:

    clear && make clean && make && ./app

------------------------------------------------------------------------

## Example Interaction

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

## Notes & Limitations

-   No STL containers used as per requirement
-   Dynamic typing is implemented manually instead of templates
