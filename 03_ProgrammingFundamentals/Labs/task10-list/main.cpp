#include "./List/List.h"
#include "./BaseType/basetype.h"

int main(void){
    // List myList;
    // string input;
    // cout << "Enter anything. \nType 'exit' to quit.\n";

    // while(1){
    //     cout << "\nInput: ";
    //     getline(cin, input);
    //     if (input == "exit") break;
    //     myList.add(input);
    // }

    // cout << "\nFinal List:\n";
    // printListContent(myList);

    List lst;
    lst.add(3);
    lst.add((bool)true);
    lst.add("Nagy");
    lst.add(4.5f);
    lst.add('B');

    // printListContent(lst);

    lst.get(0)->print();
    cout << endl;

    lst[0].print();
    cout << endl;

    cout << "Second element: " << lst[1] << endl;
    cout << "Third element: " << lst[2] << endl;


    return 0;
}