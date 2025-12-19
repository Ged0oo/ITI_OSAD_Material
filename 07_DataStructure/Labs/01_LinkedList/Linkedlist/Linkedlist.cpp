#include "Linkedlist.h"


Linkedlist::Linkedlist(){
    head = nullptr;
    tail = nullptr;
}

Linkedlist::~Linkedlist(){
    Node *temp = head;
    while (temp != nullptr){
        Node *next = temp->next;
        delete temp;
        temp = next;
    }
    
}

void Linkedlist::insert(int val){
    Node *node = new Node(val);
    if(head == nullptr){head = tail = node; return;}
    tail->next = node;
    node->prev = tail;
    tail = node;
}

// 10 -> 20 -> 30 -> 40 -> 50      [30]
void Linkedlist::removeNode(int val){
    Node *temp = head;
    while (temp != nullptr && temp->val != val){temp = temp->next;}
    if(temp == nullptr) return;

    if(temp->prev != nullptr) temp->prev->next = temp->next;
    else head = temp->next;

    if(temp->next != nullptr) temp->next->prev = temp->prev;
    else tail = temp->prev;

    delete temp;
}

void Linkedlist::printList(){
    Node *temp = head;
    while (temp != nullptr){
        cout << temp->val << " <-> ";
        temp = temp->next;
    }
    cout << "NULL" << endl;
}

void Linkedlist::reversePrintList(){
    Node *temp = tail;
    while (temp != nullptr){
        cout << temp->val << " <-> ";
        temp = temp->prev;
    }
    cout << "NULL" << endl;
}

void Linkedlist::removeNodes(int val){
    Node *temp = head;
    while (temp != nullptr){
        if(temp->val == val){
            Node *del = temp;

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

void Linkedlist::insertBefore(int data, int newData){
    Node *temp = head;
    while (temp != nullptr && temp->val != data){temp = temp->next;}
    if(temp == nullptr) return;

    Node *newNode = new Node(newData);
    newNode->next = temp;
    newNode->prev = temp->prev;

    if(temp->prev != nullptr) temp->prev->next = newNode;
    else head = newNode;

    temp->prev = newNode;
}

void Linkedlist::insertAfter(int data, int newData){
    Node *temp = head;
    while (temp != nullptr && temp->val != data){temp = temp->next;}
    if(temp == nullptr) return;

    Node *newNode = new Node(newData);
    newNode->prev = temp;
    newNode->next = temp->next;

    if(temp->next != nullptr) temp->next->prev = newNode;
    else tail = newNode;

    temp->next = newNode;
}

int Linkedlist::getNumberNodesCount(){
    int count = 0;
    Node *temp = head;
    while (temp != nullptr){temp = temp->next; count++;}
    return count;
}

int Linkedlist::getDataByIndex(int idx){
    if (idx < 0) return -1;
    Node *temp = head;
    while (temp != nullptr && idx--){temp = temp->next;}
    return temp ? temp->val : -1;
}