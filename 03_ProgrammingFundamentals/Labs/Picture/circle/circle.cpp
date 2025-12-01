#include "circle.h"

Circle::Circle() : radius(0) {}

Circle::Circle(Point c, int r) {
    this->centre = c;
    this->radius = r;
}

void Circle::draw() {
    cout << "Circle: center ";
    centre.print_point();
    cout << " radius=" << radius << endl;
}
