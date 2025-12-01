#ifndef POINT_H
#define POINT_H

#include <iostream>
using namespace std;

class Point {
private:
    int x, y;
public:
    Point();
    Point(int x,int y);
    void print_point() const;
};

#endif
