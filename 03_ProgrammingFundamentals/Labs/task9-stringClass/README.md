# String_c -- Custom C++ String Class

A lightweight implementation of a dynamic character string class in C++.  
This class mimics part of the behavior of `std::string` but is fully implemented manually using raw pointers, dynamic memory, copy/move semantics, concatenation, indexing operators, and additional utility functions such as substring, find, and trim.

---

## Features

### ✔ Dynamic Memory Management
- Strings grow automatically when new data is appended.
- Memory allocated using `new[]` and properly released in the destructor.

### ✔ Constructors
- `String_c()` — creates an empty string  
- `String_c(const char*)` — constructs from a C-style string  
- **Copy constructor**  
- **Move constructor**

### ✔ Assignment Operators
- Copy assignment — deep copy  
- Move assignment — efficient pointer stealing

### ✔ Concatenation
- `operator+` — returns a new combined string  
- `operator+=` — appends to the existing string  
- `append()` — appends a `String_c` object

### ✔ Element Access
- `operator[]` — read/write character access with bounds checking

### ✔ Utilities
- `length()` — returns current string length  
- **`substring(int start = 0, int len = size)`** — extract substring  
- **`find(const char* substring)`** — find substring position  
- **`trim()`** — removes spaces and tabs from both ends  

### ✔ Stream Output
- Supports `std::ostream <<` for direct printing

---

## New Utility Functions (Detailed Documentation)

### 🔹 `int find(const char* sub)`
Searches for the first occurrence of a C-string inside this string.

**Returns:**
- Index of occurrence  
- `-1` if not found  

**Examples:**
```
String_c s("HelloWorld");
s.find("World");   // 5
s.find("loW");     // 3
s.find("XYZ");     // -1
```

---

### 🔹 `String_c substring(int start = 0, int len = size)`
Extracts a substring starting at `start` with length `len`.

**Rules:**
- If `start < 0`, it becomes `0`
- If `start >= size`, returns an empty string
- If `start + len` exceeds size, it auto-adjusts

**Examples:**
```
String_c s("HelloWorld");
s.substring(0,5);     // "Hello"
s.substring(5);       // "World"
s.substring(3,20);    // "loWorld"
s.substring(50,5);    // ""
```

---

### 🔹 `void trim()`
Removes leading and trailing spaces `' '` and tabs `'	'`.

**Examples:**
```
String_c s("   Hello World   ");
s.trim();    // "Hello World"

String_c t("	   Nagy	  Thiiiiiiis   ");
t.trim();    // "Nagy	  Thiiiiiiis"
```

---

## Class Interface (Summary)

```cpp
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

    int find(const char* sub) const;
    String_c substring(int start = 0, int len = -1);
    void trim();

    friend std::ostream& operator<<(std::ostream&, const String_c&);
};
```

---

## Example Usage

```cpp
#include <iostream>
#include "String_c.h"

int main() {
    String_c a("Hello ");
    String_c b("World");

    String_c c = a + b;
    std::cout << c << std::endl; // Hello World

    c[0] = 'h';
    std::cout << c << std::endl; // hello World

    std::cout << "Length: " << c.length() << std::endl;

    std::cout << c.find("World") << std::endl;
    std::cout << c.substring(0, 5) << std::endl;

    return 0;
}
```

---

## File Structure

```
String_c/
├── String_c.h
├── String_c.cpp
└── README.md
```

---

## Notes
- Educational implementation to demonstrate manual memory management.  
- Not intended to replace `std::string`.  
- Bounds are checked; out-of-range access may