#include "line/line.h"
#include "rect/rect.h"
#include "point/point.h"
#include "circle/circle.h"
#include "picture/picture.h"
#include <vector>

int main() {
    Picture pic;
    vector<Shape*> shapes;

    shapes.push_back(new Line(Point(0, 0), Point(10, 10)));
    shapes.push_back(new Rect(Point(2, 2), Point(8, 6)));
    shapes.push_back(new Circle(Point(5, 5), 3));
    shapes.push_back(new Line(Point(10, 0), Point(0, 10)));
    shapes.push_back(new Rect(Point(1, 1), Point(4, 4)));
    shapes.push_back(new Circle(Point(7, 7), 2));

    for (Shape* sh : shapes) pic.addShape(sh);
    pic.paint();

    return 0;
}
