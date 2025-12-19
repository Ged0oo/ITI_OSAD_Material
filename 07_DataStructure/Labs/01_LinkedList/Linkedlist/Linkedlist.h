#ifndef __LINKED_LIST_H__
#define __LINKED_LIST_H__

#include <iostream>
#include "../Node/Node.h"

using namespace std;

template <typename T>
class Linkedlist{
public:
    Node<T> *head;
    Node<T> *tail;

    Linkedlist();
    ~Linkedlist();

    void insert(T val);
    void removeNode(T val);
    void removeNodes(T val);
    void printList();
    void reversePrintList();
    void insertBefore(T data, T newData);
    void insertAfter(T data, T newData);
    int getNumberNodesCount();
    T getDataByIndex(int idx);
};


#include "./Linkedlist.hpp"


#endif //__LINKED_LIST_H__