#ifndef __COMPLEX_H__
#define __COMPLEX_H__


#include <iostream>
#include <cmath>


using namespace std;


class Complex {
private:
    int real;
    int imag;

public:
    // Default Constructor
    Complex();

    // Parameterized Constructor
    Complex(int real, int imag);

    // Destructor
    ~Complex();

    // Copy Constructor
    Complex(const Complex& c);

    // Move Constructor
    Complex(Complex&& c);
    
    // Setters
    void setReal(int real);
    void setImag(int imag);

    // Getters
    int getReal() const;
    int getImag() const;

    // Operator Overloading
    Complex& operator=(const Complex& c);
    Complex& operator=(Complex&& c);

    Complex operator+(int realVal);
    friend Complex operator+(int realVal, const Complex& c);
    Complex operator+(const Complex& c);
    Complex operator-(const Complex& c);
    Complex operator*(const Complex& c);    
    Complex operator/(const Complex& c);

    int& operator[](int idx);

    Complex operator++();
    Complex operator--();

    Complex& operator++(int x);
    Complex& operator--(int x);

    explicit operator double(); 
    explicit operator int();    
    operator bool();            

    bool operator==(const Complex& c);
    bool operator!=(const Complex& c);
    friend ostream& operator<<(ostream& os, const Complex& c);

    void displayComplex();
    double getMagnitude();
    double getAngle();
};


#endif
