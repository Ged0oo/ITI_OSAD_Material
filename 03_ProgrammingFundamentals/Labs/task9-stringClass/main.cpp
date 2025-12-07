#include <iostream>
#include "./String/String.h"
using namespace std;

int main() {
    cout << "\n===== append =====\n";
    String_c ss("Hello ");
    ss.append("Nagy");
    cout << "ss = " << ss << endl;

    cout << "\n===== empty =====\n";
    String_c e1("");
    String_c e2("abc");
    cout << "e1.empty() = " << e1.empty() << endl;
    cout << "e2.empty() = " << e2.empty() << endl;

    cout << "\n===== clear =====\n";
    String_c c1("ClearMe");
    c1.clear();
    cout << "After clear, empty = " << c1.empty() << endl;

    cout << "\n===== compare =====\n";
    String_c a("Apple");
    String_c b("Banana");
    cout << "a.compare(b) = " << a.compare(b) << endl;
    cout << "b.compare(a) = " << b.compare(a) << endl;
    cout << "a.compare(a) = " << a.compare(a) << endl;

    cout << "\n===== equals =====\n";
    String_c eq1("Test");
    String_c eq2("Test");
    String_c eq3("test");
    cout << eq1.equals(eq2) << endl;
    cout << eq1.equals(eq3) << endl;

    cout << "\n===== find(char) =====\n";
    String_c f1("HelloWorld");
    cout << "f1.find('W') = " << f1.find('W') << endl;
    cout << "f1.find('z') = " << f1.find('z') << endl;

    cout << "\n===== find(substring) =====\n";
    cout << "f1.find(\"World\") = " << f1.find((char*)"World")  << endl; 
    cout << "f1.find(\"loW\") = "   << f1.find((char*)"loW")    << endl;     
    cout << "f1.find(\"XYZ\") = "   << f1.find((char*)"XYZ")    << endl;     

    cout << "\n===== substring Tests =====\n";
    String_c subtest("HelloWorld");
    cout << subtest.substring(0, 5) << endl;
    cout << subtest.substring(5, 5) << endl;
    cout << subtest.substring(3, 20) << endl;
    cout << subtest.substring(50, 5) << endl;

    cout << "\n===== to_upper / to_lower Tests =====\n";
    String_c u("abCD12");
    u.to_upper();
    cout << "upper = " << u << endl; 
    u.to_lower();
    cout << "lower = " << u << endl;

    cout << "\n===== trim Tests =====\n";
    String_c t1("   Hello World   ");
    t1.trim();
    cout << "[" << t1 << "]" << endl;
    String_c t2("\t   Nagy\t  Thiiiiiiis   ");
    t2.trim();
    cout << "[" << t2 << "]" << endl;
    return 0;
}
