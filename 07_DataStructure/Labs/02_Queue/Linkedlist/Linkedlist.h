#ifndef __LINKED_LIST_H__
#define __LINKED_LIST_H__

#include <iostream>
#include <stdexcept>
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
    void insertFront(T val);
    T removeFront();
    T removeRear();
    void removeNode(T val);
    void removeNodes(T val);
    void printList();
    void reversePrintList();
    void insertBefore(T data, T newData);
    void insertAfter(T data, T newData);
    int getNumberNodesCount();
    T getDataByIndex(int idx);
};

template <typename T>
Linkedlist<T>::Linkedlist(){
    head = nullptr;
    tail = nullptr;
}

template <typename T>
Linkedlist<T>::~Linkedlist(){
    Node<T> *temp = head;
    while (temp != nullptr){
        Node<T> *next = temp->next;
        delete temp;
        temp = next;
    }
    
}

template <typename T>
void Linkedlist<T>::insert(T val){
    Node<T> *node = new Node(val);
    if(head == nullptr){head = tail = node; return;}
    tail->next = node;
    node->prev = tail;
    tail = node;
}

template <typename T>
void Linkedlist<T>::insertFront(T val){
    Node<T> *node = new Node(val);
    if(head == nullptr){head = tail = node; return;}
    node->next = head;
    head->prev = node;
    head = node;
}

template <typename T>
T Linkedlist<T>::removeFront(){
    if(head == nullptr) throw out_of_range("List is empty");
    T val = head->val;
    Node<T> *temp = head;
    head = head->next;
    if(head != nullptr) head->prev = nullptr;
    else tail = nullptr;
    delete temp;
    return val;
}

template <typename T>
T Linkedlist<T>::removeRear(){
    if(tail == nullptr) throw out_of_range("List is empty");
    T val = tail->val;
    Node<T> *temp = tail;
    tail = tail->prev;
    if(tail != nullptr) tail->next = nullptr;
    else head = nullptr;
    delete temp;
    return val;
}

template <typename T>
void Linkedlist<T>::removeNode(T val){
    Node<T> *temp = head;
    while (temp != nullptr && temp->val != val){temp = temp->next;}
    if(temp == nullptr) return;

    if(temp->prev != nullptr) temp->prev->next = temp->next;
    else head = temp->next;

    if(temp->next != nullptr) temp->next->prev = temp->prev;
    else tail = temp->prev;

    delete temp;
}

template <typename T>
void Linkedlist<T>::printList(){
    Node<T> *temp = head;
    while (temp != nullptr){
        cout << temp->val << " <-> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
}

template <typename T>
void Linkedlist<T>::reversePrintList(){
    Node<T> *temp = tail;
    while (temp != nullptr){
        cout << temp->val << " <-> ";
        temp = temp->prev;
    }
    cout << "NULL" << endl;
}

template <typename T>
void Linkedlist<T>::removeNodes(T val){
    Node<T> *temp = head;
    while (temp != nullptr){
        if(temp->val == val){
            Node<T> *del = temp;

            if(temp->prev != nullptr) temp->prev->next = temp->next;
            else head = temp->next;

            if(temp->next != nullptr) temp->next->prev = temp->prev;
            else tail = temp->prev;

            temp = temp->next;
            delete del;
        }
        else temp = temp->next;
    }
}

template <typename T>
void Linkedlist<T>::insertBefore(T data, T newData){
    Node<T> *temp = head;
    while (temp != nullptr && temp->val != data){temp = temp->next;}
    if(temp == nullptr) return;

    Node<T> *newNode = new Node(newData);
    newNode->next = temp;
    newNode->prev = temp->prev;

    if(temp->prev != nullptr) temp->prev->next = newNode;
    else head = newNode;

    temp->prev = newNode;
}

template <typename T>
void Linkedlist<T>::insertAfter(T data, T newData){
    Node<T> *temp = head;
    while (temp != nullptr && temp->val != data){temp = temp->next;}
    if(temp == nullptr) return;

    Node<T> *newNode = new Node(newData);
    newNode->prev = temp;
    newNode->next = temp->next;

    if(temp->next != nullptr) temp->next->prev = newNode;
    else tail = newNode;

    temp->next = newNode;
}

template <typename T>
int Linkedlist<T>::getNumberNodesCount(){
    int count = 0;
    Node<T> *temp = head;
    while (temp != nullptr){temp = temp->next; count++;}
    return count;
}

template <typename T>
T Linkedlist<T>::getDataByIndex(int idx){
    if (idx < 0) throw out_of_range("Index Out of Range.");
    Node<T> *temp = head;
    while (temp != nullptr && idx--){temp = temp->next;}
    if(temp) return temp->val;
    else throw out_of_range("Index Out of Range.");
}


#endif //__LINKED_LIST_H__