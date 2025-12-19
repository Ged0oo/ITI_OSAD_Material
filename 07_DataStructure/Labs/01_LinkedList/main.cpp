#include "./Linkedlist/Linkedlist.h"

int main(){

    Linkedlist<string> list;
    list.insert("Mohamed");
    list.insert("Nagy");
    list.insert("Hello");
    list.insert("Mina");

    list.printList();
    
    cout << "Number of Nodes : " << list.getNumberNodesCount() << endl;
    
    cout << "Node at index 2 : " << list.getDataByIndex(2) << endl;
    
    list.insertAfter("Nagy", "Jassssss");
    list.insertBefore("Mohamed", "Ged0oo");
    
    list.printList();

    return 0;
}