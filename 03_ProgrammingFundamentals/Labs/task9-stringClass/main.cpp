#include <iostream>
#include "./String/String.h"
using namespace std;

int main() {

    std::cout << "=== Constructors ===\n";
    String_c s1("Hello");
    String_c s2("World");

    s1 += "World";
    s2 += String_c("Nagy");

    cout << s1 << endl;
    cout << s2 << endl;
    cout << s1[3] << endl;
    cout << s1.length() << endl;

    String_c ss("Hello ");
    ss.append("Nagy");
    cout << ss << endl;

    return 0;
}
