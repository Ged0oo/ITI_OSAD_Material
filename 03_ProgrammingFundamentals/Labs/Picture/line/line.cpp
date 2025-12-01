#include "line.h"
#include <iostream>
using namespace std;

Line::Line() {}

Line::Line(Point p1, Point p2) {
    this->p1 = p1;
    this->p2 = p2;
}

void Line::draw() {
    cout << "Line: ";
    p1.print_point();
    cout << " -> ";
    p2.print_point();
    cout << endl;
}
