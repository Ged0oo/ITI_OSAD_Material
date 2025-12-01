#ifndef PICTURE_H
#define PICTURE_H

#include "../shape/shape.h"
#include <vector>

class Picture {
private:
    std::vector<Shape *> shapes;

public:
    Picture(){};
    ~Picture();

    void addShape(Shape* sh);
    void paint();
};

#endif
