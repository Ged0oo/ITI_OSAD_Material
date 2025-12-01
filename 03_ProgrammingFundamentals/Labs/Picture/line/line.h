#ifndef LINE_H
#define LINE_H

#include "../shape/shape.h"
#include "../point/point.h"

class Line : public Shape {
private:
    Point p1, p2;
public:
    Line();
    Line(Point p1, Point p2);
    void draw() override;
};

#endif
