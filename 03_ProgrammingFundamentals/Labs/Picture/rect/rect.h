#ifndef RECT_H
#define RECT_H

#include "../shape/shape.h"
#include "../point/point.h"

class Rect : public Shape {
private:
    Point topLeft, bottomRight;
public:
    Rect();
    Rect(Point p1, Point p2);
    void draw() override;
};

#endif
