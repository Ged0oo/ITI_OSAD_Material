#include "rect.h"
#include <iostream>
using namespace std;

Rect::Rect() {}

Rect::Rect(Point p1, Point p2) {
    this->topLeft = p1;
    this->bottomRight = p2;
}

void Rect::draw() {
    cout << "Rectangle: ";
    topLeft.print_point();
    cout << " to ";
    bottomRight.print_point();
    cout << endl;
}
