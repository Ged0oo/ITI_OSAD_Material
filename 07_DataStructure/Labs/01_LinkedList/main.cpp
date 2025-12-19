#include "./Linkedlist/Linkedlist.h"

int main(){

    Linkedlist list;
    list.insert(10);
    list.insert(20);
    list.insertBefore(20, 15);
    list.insertAfter(15, 22);
    list.printList();
    cout << list.getDataByIndex(-3) << endl;
    return 0;
}