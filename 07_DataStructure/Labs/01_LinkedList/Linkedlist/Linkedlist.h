#ifndef __LINKED_LIST_H__
#define __LINKED_LIST_H__

#include <iostream>
#include "../Node/Node.h"

using namespace std;

class Linkedlist{
public:
    Node *head;
    Node *tail;

    Linkedlist();
    ~Linkedlist();

    void insert(int val);
    void removeNode(int val);
    void removeNodes(int val);
    void printList();
    void reversePrintList();
    void insertBefore(int data, int newData);
    void insertAfter(int data, int newData);
    int getNumberNodesCount();
    int getDataByIndex(int idx);
};

#endif //__LINKED_LIST_H__