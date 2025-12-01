#include "picture/picture.h"
#include "line/line.h"
#include "rect/rect.h"
#include "circle/circle.h"
#include "point/point.h"

int main() {
    Picture pic;

    pic.addShape(new Line(Point(0,0), Point(10,10)));
    pic.addShape(new Rect(Point(2,2), Point(8,6)));
    pic.addShape(new Circle(Point(5,5), 3));
    pic.addShape(new Line(Point(1,1), Point(4,5)));

    pic.paint();

    return 0;
}
