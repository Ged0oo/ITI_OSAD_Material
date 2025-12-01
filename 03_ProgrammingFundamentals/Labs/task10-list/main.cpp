#include "./List/List.h"
#include "./BaseType/basetype.h"

int main(void){
    List myList;
    string input;
    cout << "Enter anything. \nType 'exit' to quit.\n";

    while(1){
        cout << "\nInput: ";
        getline(cin, input);
        if (input == "exit") break;
        myList.add(input);
    }

    cout << "\nFinal List:\n";
    printListContent(myList);

    List lst;
    lst.add(3);
    lst.add("Nagy");
    lst.add(4.5f);
    lst.add('B');
    printListContent(lst);

    return 0;
}