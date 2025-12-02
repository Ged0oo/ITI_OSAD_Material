#ifndef PICTURE_H
#define PICTURE_H

#include "../shape/shape.h"
#include <iostream>

class Picture {
private:
    Shape** shapes;
    int count;
    int capacity;
    void resize();

public:
    Picture();
    ~Picture();

    void addShape(Shape* sh);
    void paint();
};

#endif
