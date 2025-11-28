#include "List.h"


List::List(int capacity) {
    cap = capacity;
    size = 0;
    data = new basetype*[cap];
}


List::~List() {
    for(int i = 0; i < size; i++) delete data[i];
    delete[] data;
}


int List::getSize() { return size; }
int List::getCap() { return cap; }


void List::setSize(int s) { size = s; }
void List::setCap(int c) { cap = c; }


void List::add(basetype *obj) {
    if(!obj) {
        cout << "Error: trying to add nullptr!" << endl;
        return;
    }
    if(size < cap) {
        data[size++] = obj;
    } else {
        int newCap = cap * 2;
        basetype **tmp = new basetype*[newCap];
        for(int i = 0; i < size; i++) tmp[i] = data[i];
        delete[] data;
        data = tmp;
        cap = newCap;
        data[size++] = obj;
    }
}


basetype* List::get(int idx) {
    if(idx >= 0 && idx < size) return data[idx];
    return nullptr;
}


void printListContent(List& myList){
    for (int i = 0; i < myList.getSize(); i++) {
        cout << i << ": ";
        basetype* entry = myList.get(i);
        if (entry) {
            entry->print();
            cout << " (" << entry->getType() << ")";
        }
        cout << endl;
    }
}
