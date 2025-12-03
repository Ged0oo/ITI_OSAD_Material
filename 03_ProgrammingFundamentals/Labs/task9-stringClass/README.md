# String_c -- Custom C++ String Class

A lightweight implementation of a dynamic character string class in
C++.\
This class mimics part of the behavior of `std::string` but is fully
implemented manually using raw pointers, dynamic memory, copy/move
semantics, concatenation, and indexing operators.

## Features

### ✔ Dynamic memory management

-   Strings grow automatically when new data is appended.
-   Memory allocated with `new[]` and released in destructor.

### ✔ Constructors

-   `String_c()` -- creates an empty string
-   `String_c(const char*)` -- constructs from a C-string
-   **Copy constructor**
-   **Move constructor**

### ✔ Assignment Operators

-   Copy assignment (`operator=`) -- deep copy
-   Move assignment (`operator=`) -- efficient pointer stealing

### ✔ Concatenation

-   `operator+` -- returns a new string combining two strings
-   `operator+=` -- appends to current string
-   `append()` -- appends another `String_c` object

### ✔ Element Access

-   `operator[]` -- access character by index (read/write)

### ✔ Utility

-   `length()` -- returns current string length

### ✔ Stream Output

-   Supports `std::ostream <<` for printing

## Class Interface (Summary)

    class String_c {
    private:
        char* data;
        int size;

    public:
        String_c();
        ~String_c();
        String_c(const char*);
        String_c(const String_c&);
        String_c(String_c&&) noexcept;

        String_c& operator=(const String_c&);
        String_c& operator=(String_c&&) noexcept;

        String_c& operator+=(const String_c&);
        String_c operator+(const String_c&) const;

        void append(const String_c&);
        int length() const;

        char& operator[](int idx);
        const char& operator[](int idx) const;

        friend std::ostream& operator<<(std::ostream&, const String_c&);
    };

## Example Usage

    #include <iostream>
    #include "String_c.h"

    int main() {
        String_c a("Hello ");
        String_c b("World");

        String_c c = a + b;
        std::cout << c << std::endl;

        c[0] = 'h';
        std::cout << c << std::endl;

        std::cout << "Length: " << c.length() << std::endl;

        return 0;
    }

## File Structure

    String_c/
    ├── String_c.h
    ├── String_c.cpp
    └── README.md

## Notes

-   Educational implementation to demonstrate manual memory management.
-   Not intended to replace std::string.
-   Bounds checking throws std::out_of_range.