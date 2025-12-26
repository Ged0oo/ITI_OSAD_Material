#include <iostream>
#include "./Queue/Queue.h"

using namespace std;

int main(){
    cout << "=== Deque (Double-Ended Queue) Implementation Test ===\n\n";

    Queue que(5);

    cout << "Testing insertRear operations:\n";
    que.insertRear(10);
    que.insertRear(20);
    que.insertRear(30);
    cout << "After inserting 10, 20, 30 from rear:\n";
    que.display();

    cout << "\nTesting insertFront operations:\n";
    que.insertFront(5);
    que.insertFront(1);
    cout << "After inserting 5, 1 from front:\n";
    que.display();

    cout << "\nTesting deleteFront operation:\n";
    int deleted = que.deleteFront();
    cout << "Deleted from front: " << deleted << endl;
    cout << "Queue after deleteFront:\n";
    que.display();

    cout << "\nTesting deleteRear operation:\n";
    deleted = que.deleteRear();
    cout << "Deleted from rear: " << deleted << endl;
    cout << "Queue after deleteRear:\n";
    que.display();

    cout << "\nTesting full queue condition:\n";
    que.insertRear(40);
    que.insertRear(50);
    cout << "After adding more elements:\n";
    que.display();

    cout << "Trying to insert when full:\n";
    que.insertFront(0); 

    cout << "\nTesting empty queue condition:\n";
    que.deleteFront();
    que.deleteFront();
    que.deleteFront();
    que.deleteFront();
    que.deleteFront();
    cout << "After emptying the queue:\n";
    que.display();

    cout << "Trying to delete from empty queue:\n";
    que.deleteFront();
    que.deleteRear();

    return 0;
}
