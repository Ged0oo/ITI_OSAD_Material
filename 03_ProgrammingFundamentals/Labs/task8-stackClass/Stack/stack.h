#ifndef __STACK_H__
#define __STACK_H__

#include <iostream>
using namespace std;

template <typename T>
class Stack_c {
private:
    T* st;
    int top;
    int size;

public:
    Stack_c(int size = 8);
    ~Stack_c();

    Stack_c(const Stack_c<T>& other_st);
    Stack_c(Stack_c<T>&& other_st);
    
    Stack_c<T>& operator=(const Stack_c<T>& other_st);
    Stack_c<T>& operator=(Stack_c<T>&& other_st);

    bool isEmpty();
    bool isFull();
    void push(const T& val);

    T pop();
    T peek();

    void print();
};


#include "stack.hpp"


#endif
