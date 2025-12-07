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

void String_c::append(const char *str) {
    int extra = strlen(str);
    int newSize = size + extra;
    char* buffer = new char[newSize + 1];

    if (data) strcpy(buffer, data);
    else buffer[0] = '\0';

    strcpy(buffer + size, str);

    delete[] data;
    data = buffer;
    size = newSize;
}

int String_c::length() {
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
    data = nullptr;
    size = 0;
}

std::ostream& operator<<(std::ostream& os, const String_c& s) {
    os << s.data;
    return os;
}

bool String_c::empty(){
    return this->size == 0;
}

void String_c::clear(){
    delete[] data;
    data = nullptr;
    size = 0;
}

int String_c::compare(String_c& c){
    int i=0;
    while (this->data[i] && c.data[i]){
        if(this->data[i] < c.data[i]) return -1;
        else if(this->data[i] > c.data[i]) return 1;
        i++;
    }
    if(this->data[i] == c.data[i]) return 0;
    return (this->data[i] ? 1 : -1);
}

bool String_c::equals(String_c& c){
    if(this->size != c.size) return false;
    int i=0;
    while (this->data[i++] && c.data[i++]){
        if (this->data[i] != c.data[i]) return false;
    }
    return true;
}

int String_c::find(char ch){
    for(int i=0 ; i<size ; i++){
        if(data[i] == ch) return i;
    }
    return -1;
}

int String_c::find(char* sub){
    int sLen = strlen(sub);
    if(sLen == 0 || sLen>size) return -1;

    for(int i=0 ; i<=size-sLen ; i++){
        bool flage = true;

        for(int j=0 ; j<sLen ; j++){
            if(data[i+j] != sub[j]) {
                flage = false;
                break;
            }
        }
        
        if(flage) return i;
    }

    return -1;
}

String_c String_c::substring(int start, int len){
    if(start < 0) start = 0;
    if(start >= size) return String_c("");

    if(start+len > size) len = size-start;

    char *buff = new char[len + 1];
    for(int i=0 ; i<len ; i++) buff[i] = data[start+i];
    buff[len] = '\0';

    String_c ret(buff);
    delete[] buff;
    return ret;
}

void String_c::to_upper() {
    for (int i = 0; i < size; i++) {
        if (data[i] >= 'a' && data[i] <= 'z') data[i] -= 32;
    }
}

void String_c::to_lower() {
    for (int i = 0; i < size; i++) {
        if (data[i] >= 'A' && data[i] <= 'Z') data[i] += 32;
    }
}

void String_c::trim(){
    if(size == 0) return;
    int left = 0, right = size - 1;

    while (left<size && (data[left]  == ' ' || data[left]  == '\t')){left++;}
    while (right>=0  && (data[right] == ' ' || data[right] == '\t')){right--;}
    
    int newLen = (left > right) ? 0 : (right - left + 1);
    char * buff = new char[newLen+1];
    for(int i=0 ; i<newLen ; i++) buff[i] = data[left+i];
    buff[newLen] = '\0';

    delete[] data;
    data = buff;
    size = newLen;
}