#ifndef __STACK_H__
#define __STACK_H__

#include <iostream>
using namespace std;

template <typename T>
class Stack_c {
private:
    T* st;
    int top;
    int capacity;

public:
    Stack_c(int size = 8);
    ~Stack_c();

    bool isEmpty();
    bool isFull();
    void push(const T& val);

    T pop();
    T peek();

    void print();
};


#include "stack.hpp"


#endif
