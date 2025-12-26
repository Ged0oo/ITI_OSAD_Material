#include "./Queue.h"

Queue::Queue(int cap){
    this->cap = cap;
    items = new int[cap];
    front = rear = -1;
}

Queue::~Queue(){
    delete[] items;
}

bool Queue::isFull(){
    return front == (rear + 1)%cap;
}

bool Queue::isEmpty(){
    return front == -1;
}

void Queue::insertRear(int item){
    if(isFull()){ cout << "Queue is Full" << endl; return; } 
    else if(isEmpty()){ rear = front = 0;} 
    else rear = (rear+1)%cap;
    items[rear] = item;
}

void Queue::insertFront(int item){
    if(isFull()){ cout << "Queue is Full" << endl; return; }
    else if(isEmpty()){ rear = front = 0;}
    else{front = (front - 1 + cap)%cap;}
    items[front] = item;
}

int Queue::deleteFront(){
    if(isEmpty()){cout << "The Queue is Empty" << endl; return -1;}
    int ret = items[front];
    if(front == rear){front = rear = -1;}
    else front = (front + 1)%cap;
    return ret;
}

int Queue::deleteRear(){
    if(isEmpty()){cout << "The Queue is Empty" << endl; return -1;}
    int ret = items[rear];
    if(front == rear){front = rear = -1;}
    else rear = (rear - 1 + cap)%cap;
    return ret;
}

void Queue::display(){
    if(isEmpty()){
        cout<<"Empty Queue" ; return ;
    }

    cout<<"\n========================================\n";
    int i = front%cap;
    while(i != rear){
        cout<<items[i]<< "\t";
        i=(i+1)%cap;
    }
    cout<<items[rear];
    cout<<"\n========================================\n";
}