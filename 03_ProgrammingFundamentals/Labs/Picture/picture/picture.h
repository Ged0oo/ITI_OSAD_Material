#ifndef PICTURE_H
#define PICTURE_H

#include "../shape/shape.h"

class Picture {
private:
    Shape* arr[10];
    int count;
public:
    Picture();
    ~Picture();
    void addShape(Shape* sh);
    void paint();
};

#endif
