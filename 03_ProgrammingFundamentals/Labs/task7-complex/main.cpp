#include "./complex/complex.h"

void printHeader(string title) {
    cout << "\n================ " << title << " ================\n";
}

int main() {


    // 1. Default Constructor
    printHeader("Default Constructor");
    Complex c1;
    cout << "c1 = " << c1 << endl;


    // 2. Parameterized Constructor
    printHeader("Parameterized Constructor");
    Complex c2(3, 4);
    cout << "c2 = " << c2 << endl;


    // 3. Copy Constructor
    printHeader("Copy Constructor");
    Complex c3(c2);
    cout << "c3 (copy of c2) = " << c3 << endl;


    // 4. Move Constructor
    printHeader("Move Constructor");
    Complex temp(10, 20);
    Complex c4(move(temp));
    cout << "c4 (moved from temp) = " << c4 << endl;


    // 5. Setters & Getters
    printHeader("Setters & Getters");
    c4.setReal(99);
    c4.setImag(77);
    cout << "c4 = " << c4 << endl;
    cout << "Real: " << c4.getReal() << endl;
    cout << "Imag: " << c4.getImag() << endl;


    // 6. Assignment Operator (copy)
    printHeader("Copy Assignment");
    Complex c5;
    c5 = c2;
    cout << "c5 = " << c5 << endl;


    // 7. Assignment Operator (move)
    printHeader("Move Assignment");
    Complex temp2(50, 60);
    Complex c6;
    c6 = move(temp2);
    cout << "c6 = " << c6 << endl;


    // 8. Operator + (Complex + Complex)
    printHeader("Addition Operator (Complex + Complex)");
    Complex c7 = c2 + c3;
    cout << c2 << " + " << c3 << " = " << c7 << endl;

    // 9. Operator + (Complex + int)
    printHeader("Complex + int");
    Complex c9 = c2 + 5;
    cout << c2 << " + 5 = " << c9 << endl;

    // 10. Operator + (int + Complex)
    printHeader("int + Complex");
    Complex c10 = 10 + c2;
    cout << "10 + " << c2 << " = " << c10 << endl;

    // 11. Operator -
    printHeader("Subtraction Operator");
    Complex c11 = c2 - c3;
    cout << c2 << " - " << c3 << " = " << c11 << endl;


    // 12. Operator *
    printHeader("Multiplication Operator");
    Complex c12 = c2 * c3;
    cout << c2 << " * " << c3 << " = " << c12 << endl;


    // 13. Operator /
    printHeader("Division Operator");
    Complex c13 = c2 / Complex(1, 1);
    cout << c2 << " / (1 + i) = " << c13 << endl;


    // 14. Operator ==
    printHeader("Equality Operator");
    Complex c14(3, 4);
    cout << c2 << " == " << c14 << " ? " << (c2 == c14) << endl;


    // 15. Operator !=
    printHeader("Inequality Operator");
    cout << c2 << " != " << c3 << " ? " << (c2 != c3) << endl;


    // 16. stream operator <<
    printHeader("Output Operator <<");
    cout << "c2 = " << c2 << endl;


    // 17. Magnitude
    printHeader("Magnitude");
    cout << "|c2| = " << c2.getMagnitude() << endl;


    // 18. Angle in degrees
    printHeader("Angle (Degrees)");
    cout << "Angle(c2) = " << c2.getAngle() << " degrees" << endl;


    // 19. displayComplex() check
    printHeader("Display Complex");
    c2.displayComplex();


    return 0;
}