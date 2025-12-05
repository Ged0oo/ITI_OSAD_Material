#include <iostream>
#include "./complex/complex.h"
using namespace std;

int main() {

    cout << "=== Constructors ===\n";
    Complex c1(3, 4);
    Complex c2(1, 2);
    Complex c3 = c1; // Copy constructor
    Complex c4 = std::move(c2); // Move constructor
    cout << "c1 = " << c1 << "\n";
    cout << "c3 (copy of c1) = " << c3 << "\n";
    cout << "c4 (moved from c2) = " << c4 << "\n\n";

    cout << "=== Copy & Move Assignment ===\n";
    Complex a(10, 20);
    Complex b(5, 5);
    b = a; // Copy assignment
    cout << "b (after copy assign from a) = " << b << "\n";

    Complex m(99, 99);
    Complex n(11, 11);
    n = std::move(m); // Move assignment
    cout << "n (after move assign from m) = " << n << "\n\n";

    cout << "=== Arithmetic Operators ===\n";
    Complex add1 = c1 + 5;
    Complex add2 = 5 + c1;
    Complex add3 = c1 + c3;
    Complex sub = c1 - c3;
    Complex mul = c1 * c3;
    Complex div = c1 / Complex(1, 1);

    cout << "c1 + 5 = " << add1 << "\n";
    cout << "5 + c1 = " << add2 << "\n";
    cout << "c1 + c3 = " << add3 << "\n";
    cout << "c1 - c3 = " << sub << "\n";
    cout << "c1 * c3 = " << mul << "\n";
    cout << "c1 / (1+i) = " << div << "\n\n";

    cout << "=== Comparison Operators ===\n";
    cout << "c1 == c3 ? " << (c1 == c3) << "\n";
    cout << "c1 != c3 ? " << (c1 != c3) << "\n\n";

    cout << "=== [] Operator ===\n";
    cout << "c1[0] (real) = " << c1[0] << "\n";
    cout << "c1[1] (imag) = " << c1[1] << "\n";
    c1[0] = 100;
    c1[1] = 200;
    cout << "After modification c1 = " << c1 << "\n\n";

    cout << "=== Increment/Decrement ===\n";
    Complex x(10, 5);

    cout << "Original x = " << x << "\n";
    cout << "Prefix ++x = " << ++x << "\n"; 
    cout << "Prefix --x = " << --x << "\n";
    cout << "Postfix x++ returns = " << (x++) << "\n";
    cout << "After x++ now = " << x << "\n";
    cout << "Postfix x-- returns = " << (x--) << "\n";
    cout << "After x-- now = " << x << "\n\n";

    cout << "=== Casting Operators ===\n";
    Complex z(3, 4);

    double d = (double)z;
    int i = (int)z;
    bool b1 = (bool)z;
    Complex zero(0, 0);
    bool b2 = (bool)zero;

    cout << "double(z) = " << d << "\n";
    cout << "int(z) = " << i << "\n";
    cout << "bool(z) = " << b1 << "\n";
    cout << "bool(zero) = " << b2 << "\n";

    cout << "=== i/o Stream Overloading ===\n" << endl;
    Complex test;
    cin >> test;
    cout << test << endl;

    cout << "=== += and -= Overloading ===\n" << endl;
    Complex c11(5,5);
    Complex c22(2,2);
    cout << "C11 : " << c11 << endl;
    cout << "C12 : " << c22 << endl;
    c11 += c22;
    cout << "C1 aftre += : " << c11 << endl;
    c11 -= c22;
    cout << "C1 aftre -= : " << c11 << endl;
    return 0;
}
