#include <iostream>
#include "./Linkedlist/Linkedlist.h"
#include "./BubbleSort/bubbleSort.h"
#include "LinearSearch/linearSearch.h"
#include "./BinarySearch/binarySearch.h"
#include "./InsertionSort/insertionSort.h"


using namespace std;


void testBinarySearch(){
    Linkedlist<int> list;

    list.insert(1);
    list.insert(2);
    list.insert(4);
    list.insert(16);
    list.insert(19);
    list.insert(51);

    if (binarySearch<int>(list.head, nullptr, 4)) cout << "Found 4\n";
    else cout << "Not Found 4\n";

    if (binarySearch<int>(list.head, nullptr, 5)) cout << "Found 5\n";
    else cout << "Not Found 5\n";

    if (binarySearch<int>(list.head, nullptr, 1)) cout << "Found 1\n";
    else cout << "Not Found 1\n";

    if (binarySearch<int>(list.head, nullptr, 51)) cout << "Found 51\n";
    else cout << "Not Found 51\n";
}


void testLinearSearch(){
    Linkedlist<int> list;

    list.insert(1);
    list.insert(2);
    list.insert(4);
    list.insert(16);
    list.insert(19);
    list.insert(51);

    if (linearSearch<int>(list.head, 4)) cout << "Found 4\n";
    else cout << "Not Found 4\n";

    if (linearSearch<int>(list.head, 5)) cout << "Found 5\n";
    else cout << "Not Found 5\n";

    if (linearSearch<int>(list.head, 1)) cout << "Found 1\n";
    else cout << "Not Found 1\n";

    if (linearSearch<int>(list.head, 51)) cout << "Found 51\n";
    else cout << "Not Found 51\n";
}


void testBubbleSort(){
    Linkedlist<int> list;
    list.insert(10);
    list.insert(-2);
    list.insert(4);
    list.insert(1);
    list.insert(9);
    list.insert(51);
    list.printList();
    bubbleSort(list);
    list.printList();
}


void testInsertionSort(){
    Linkedlist<int> list;
    list.insert(10);
    list.insert(-2);
    list.insert(4);
    list.insert(1);
    list.insert(9);
    list.insert(51);
    list.printList();
    insertionSort(list);
    list.printList();
}


int main(){
    testInsertionSort();
}
