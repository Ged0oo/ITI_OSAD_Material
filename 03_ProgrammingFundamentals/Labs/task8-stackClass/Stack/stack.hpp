#ifndef __STACK_HPP__
#define __STACK_HPP__

#include <iostream>
using namespace std;

template <typename T>
Stack_c<T>::Stack_c(int size) {
    st = new T[size];
    capacity = size;
    top = -1;
}

template <typename T>
Stack_c<T>::~Stack_c() {
    delete[] st;
}

template <typename T>
bool Stack_c<T>::isEmpty() {
    return top == -1;
}

template <typename T>
bool Stack_c<T>::isFull() {
    return top == capacity - 1;
}

template <typename T>
void Stack_c<T>::push(const T& val) {
    if (isFull()) {
        cout << "Stack overflow." << endl;
        return;
    }
    st[++top] = val;
}

template <typename T>
T Stack_c<T>::pop() {
    if (isEmpty()) {
        cout << "Stack underflow." << endl;
        return T();
    }
    return st[top--];
}

template <typename T>
T Stack_c<T>::peek() {
    if (isEmpty()) {
        cout << "Stack is empty." << endl;
        return T();
    }
    return st[top];
}


template <typename T>
void Stack_c<T>::print() {
    if (isEmpty()) {
        cout << "Stack is empty." << endl;
        return;
    }

    cout << "Stack content (bottom -> top): ";
    for (int i = 0; i <= top; i++) {
        cout << st[i] << " ";
    }
    cout << endl;
}


#endif

