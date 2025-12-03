#include <iostream>
#include "./String/String.h"

int main() {

    std::cout << "=== Constructors ===\n";
    String_c s1("Hello");
    String_c s2("World");
    String_c s3;

    std::cout << "s1 = " << s1 << "\n";
    std::cout << "s2 = " << s2 << "\n";
    std::cout << "s3 = " << s3 << "\n\n";


    std::cout << "=== Copy Constructor ===\n";
    String_c s4(s1);
    std::cout << "s4 (copy of s1) = " << s4 << "\n\n";


    std::cout << "=== Copy Assignment ===\n";
    s3 = s1;
    std::cout << "s3 = " << s3 << "\n\n";

    
    std::cout << "=== operator+ ===\n";
    String_c s6 = s1 + String_c(" C++");
    std::cout << "s6 = " << s6 << "\n\n";


    std::cout << "=== operator+= ===\n";
    s6 += String_c(" String Class");
    std::cout << "s6 = " << s6 << "\n\n";


    std::cout << "=== append() ===\n";
    s1.append(String_c("!!"));
    std::cout << "s1 = " << s1 << "\n\n";


    std::cout << "=== operator[] ===\n";
    std::cout << "s1[0] = " << s1[0] << "\n";
    s1[0] = 'h';
    std::cout << "s1 (after edit) = " << s1 << "\n\n";


    std::cout << "=== length() ===\n";
    std::cout << "Length of s1 = " << s1.length() << "\n\n";


    std::cout << "=== All Tests Done ===\n";

    return 0;
}
