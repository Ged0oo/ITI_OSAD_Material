#ifndef __STACK_HPP__
#define __STACK_HPP__

#include <iostream>
using namespace std;


template <typename T>
Stack_c<T>::Stack_c(int size) {
    st = new T[size];
    this->size = size;
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
    return top == size - 1;
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


template <typename T>
Stack_c<T>::Stack_c(const Stack_c<T>& other_st) : size(other_st.size), top(other_st.top){
    st = new T[size];
    for(int i=0 ; i<=top ; i++) st[i] = other_st.st[i];
}


template <typename T>
Stack_c<T>& Stack_c<T>::operator=(const Stack_c<T>& other_st) {
    if (this == &other_st) return *this;
    delete[] st;

    size = other_st.size;
    top  = other_st.top;

    st = new T[size];
    for (int i = 0; i <= top; i++)
        st[i] = other_st.st[i];

    return *this;
}


template <typename T>
Stack_c<T>::Stack_c(Stack_c<T>&& other_st) : st(other_st.st), size(other_st.size), top(other_st.top) {
    other_st.st = nullptr;
    other_st.size = 0;
    other_st.top = -1;
}


template <typename T>
Stack_c<T>& Stack_c<T>::operator=(Stack_c<T>&& other_st) {
    if (this == &other_st) return *this;
    delete[] st; 

    st = other_st.st;
    size = other_st.size;
    top = other_st.top;

    other_st.st = nullptr;
    other_st.size = 0;
    other_st.top = -1;

    return *this;
}


#endif