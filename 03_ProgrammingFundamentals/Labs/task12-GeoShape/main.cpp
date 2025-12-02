#include <iostream>
#include "./Rect/rect.h"
#include "./Square/square.h"
#include "./Triangle/triangle.h"
#include "./Circle/circle.h"

using namespace std;

int main(){

    Rect r(4, 5);
    cout << "Rect = " << r.calculateArea() << endl;

    Square s(6);    
    cout << "Square = " << s.calculateArea() << endl;

    Triangle t(10, 4);
    cout << "Triangle = " << t.calculateArea() << endl;

    Circle c(7);
    cout << "Circle = " << c.calculateArea() << endl;

    return 0;
}
