#ifndef __STRING_C_H__
#define __STRING_C_H__

#include <iostream>
#include <cstring>

class String_c {
private:
    char* data;
    int size;

public:
    String_c();
    ~String_c();
    String_c(const char *);

    String_c(const String_c&);
    String_c(String_c&&) noexcept;

    String_c& operator=(const String_c&);
    String_c& operator=(String_c&&) noexcept;

    String_c& operator+=(const String_c&);
    String_c operator+(const String_c&) const;

    void append(const String_c&);
    void append(const char *);
    int length() const;

    char& operator[](int idx);
    const char& operator[](int idx) const;

    friend std::ostream& operator<<(std::ostream&, const String_c&);
};

#endif
