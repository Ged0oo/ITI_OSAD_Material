#ifndef __QUEUE_H__
#define __QUEUE_H__


#include <iostream>
#include <stdexcept>
using namespace std;
#include "../Linkedlist/Linkedlist.h"


template <typename T>
class Queue{
private:
    Linkedlist<T> *list;

public:
    Queue();
    ~Queue();

    void insertRear(T item);
    void insertFront(T item);
    
    T deleteFront();
    T deleteRear();
    
    void display();
    bool isEmpty();
};

template <typename T>
Queue<T>::Queue(){
    list = new Linkedlist<T>();
}

template <typename T>
Queue<T>::~Queue(){
    delete list;
}

template <typename T>
bool Queue<T>::isEmpty(){
    return list->head == nullptr;
}

template <typename T>
void Queue<T>::insertRear(T item){
    list->insert(item);
}

template <typename T>
void Queue<T>::insertFront(T item){
    list->insertFront(item);
}

template <typename T>
T Queue<T>::deleteFront(){
    if(isEmpty()){cout << "The Queue is Empty" << endl; throw out_of_range("Queue is empty");}
    return list->removeFront();
}

template <typename T>
T Queue<T>::deleteRear(){
    if(isEmpty()){cout << "The Queue is Empty" << endl; throw out_of_range("Queue is empty");}
    return list->removeRear();
}

template <typename T>
void Queue<T>::display(){
    if(isEmpty()){
        cout<<"Empty Queue" << endl; return ;
    }
    list->printList();
}


#endif //__QUEUE_H__
