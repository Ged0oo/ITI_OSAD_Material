#include "complex.h"

Complex::Complex(){
    // cout << "Default Constructor Call" << endl; 
    real = 0; 
    imag = 0;
}

Complex::Complex(int real, int imag){
    // cout << "Parametrized Constructor Call" << endl; 
    this->real = real; 
    this->imag = imag;
}

Complex::~Complex(){ 
    // cout << "Destructor Call" << endl; 
}

void Complex::setReal(int real){this->real = real;}
void Complex::setImag(int imag){this->imag = imag;}

int Complex::getReal() const {return this->real;}
int Complex::getImag() const {return this->imag;}

void Complex::displayComplex(){cout<<this->real<<" + "<<this->imag<<"i"<<endl;}

Complex::Complex(const Complex& c){this->real = c.real; this->imag = c.imag;}

Complex::Complex(Complex&& c){
    this->real = c.real; 
    this->imag = c.imag;
    c.real = 0;
    c.imag = 0;
}

Complex& Complex::operator=(const Complex& c){
    if(this != &c){
        this->real = c.real;
        this->imag = c.imag;
    }
    return *this;
}

Complex& Complex::operator=(Complex&& c){
    if(this != &c){
        this->real = c.real;
        this->imag = c.imag;
        c.real = 0;
        c.imag = 0;
    }
    return *this;
}

Complex Complex::operator+(int realVal){
    return Complex(real+realVal, imag);
}

Complex operator+(int realVal, const Complex& c) {
    return Complex(c.getReal() + realVal, c.getImag());
}

Complex Complex::operator+(const Complex& c){
    return Complex(real+c.real, imag+c.imag);
}

Complex Complex::operator-(const Complex& c){
    return Complex(real-c.real, imag-c.imag);
}

Complex Complex::operator*(const Complex& c){
    return Complex(
        real*c.real - imag*c.imag, 
        real*c.real + imag*c.imag
    );
}

Complex Complex::operator/(const Complex& c){
    int denomerator = c.real*c.real + c.imag*c.imag;
    return Complex(
        (real*c.real - imag*c.imag)/denomerator, 
        (real*c.real + imag*c.imag)/denomerator
    );
}

ostream& operator<<(ostream& os, const Complex& c) {
    os << c.real;
    if (c.imag >= 0) os << " + " << c.imag << "i";
    else os << " - " << -c.imag << "i";
    return os;
}

bool Complex::operator==(const Complex& c){
    return (real==c.real && imag==c.imag);
}

bool Complex::operator!=(const Complex& c){
    return !(*this == c);
}

double Complex::getMagnitude(){
    return sqrt(real*real + imag*imag);
}

double Complex::getAngle() {
    double rad = atan2(imag, real);
    return rad * (180.0 / M_PI);
}