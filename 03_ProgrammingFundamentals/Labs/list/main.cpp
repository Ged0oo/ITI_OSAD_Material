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
        
        basetype *obj = detectType(input);
        myList.add(obj);
    }

    cout << "\nFinal List:\n";
    printListContent(myList);

    return 0;
}