#include "String.h"

String_c::String_c() {
    size = 0;
    data = new char[1];
    data[0] = '\0';
}

String_c::String_c(const char* str) {
    size = strlen(str);
    data = new char[size + 1];
    strcpy(data, str);
}

String_c::String_c(const String_c& other) {
    size = other.size;
    data = new char[size + 1];
    strcpy(data, other.data);
}

String_c::String_c(String_c&& other) noexcept {
    data = other.data;
    size = other.size;

    other.data = nullptr;
    other.size = 0;
}

String_c& String_c::operator=(const String_c& other) {
    if (this != &other) {
        delete[] data;
        size = other.size;
        data = new char[size + 1];
        strcpy(data, other.data);
    }
    return *this;
}

String_c& String_c::operator=(String_c&& other) noexcept {
    if (this != &other) {
        delete[] data;

        data = other.data;
        size = other.size;

        other.data = nullptr;
        other.size = 0;
    }
    return *this;
}

String_c& String_c::operator+=(const String_c& other) {
    append(other);
    return *this;
}

String_c String_c::operator+(const String_c& other) const {
    String_c temp(*this);
    temp.append(other);
    return temp;
}

void String_c::append(const String_c& other) {
    char* buffer = new char[size + other.size + 1];

    strcpy(buffer, data);
    strcpy(buffer + size, other.data);

    delete[] data;
    data = buffer;
    size += other.size;
}

int String_c::length() const {
    return size;
}

char& String_c::operator[](int idx) {
    if (idx >= 0 && idx < size)
        return data[idx];
    throw std::out_of_range("Index out of range");
}

const char& String_c::operator[](int idx) const {
    if (idx >= 0 && idx < size)
        return data[idx];
    throw std::out_of_range("Index out of range");
}

String_c::~String_c() {
    delete[] data;
}

std::ostream& operator<<(std::ostream& os, const String_c& s) {
    os << s.data;
    return os;
}
