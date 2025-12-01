#ifndef CIRCLE_H
#define CIRCLE_H

#include "../shape/shape.h"
#include "../point/point.h"

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
