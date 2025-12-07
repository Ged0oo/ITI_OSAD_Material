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
    int length();

    bool empty() ;
    void clear();

    int compare( String_c&) ;
    bool equals( String_c&) ;

    int find(char ch) ;
    int find( char* sub) ;

    String_c substring(int start = 0, int len = -1);

    void to_upper();
    void to_lower();
    void trim();

    char& operator[](int idx);
    const char& operator[](int idx) const;

    friend std::ostream& operator<<(std::ostream&, const String_c&);
};

#endif
