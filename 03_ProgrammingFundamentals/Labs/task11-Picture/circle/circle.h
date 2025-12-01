#ifndef CIRCLE_H
#define CIRCLE_H

#include "../shape/shape.h"
#include "../point/point.h"

#include <iostream>
using namespace std;

class Circle : public Shape {
private:
    Point centre;
    int radius;
public:
    Circle();
    Circle(Point c, int r);
    void draw() override;
};

#endif
