#ifndef __QUEUE_H__
#define __QUEUE_H__


#include <iostream>
using namespace std;


class Queue{
private:
    int *items;
    int rear, front, cap;

public:
    Queue(int cap);
    ~Queue();

    void insertRear(int item);
    int  deleteFront();
    void display();
    void insertFront(int item);
    int deleteRear();
    bool isFull();
    bool isEmpty();
};


#endif //__QUEUE_H__
