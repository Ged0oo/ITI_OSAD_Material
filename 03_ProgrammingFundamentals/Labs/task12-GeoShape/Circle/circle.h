#ifndef __CIRCLE_H__
#define __CIRCLE_H__

#include "../GeoShape/Geoshape.h"

class Circle : public Geoshape {
public:
    Circle(float r) : Geoshape(r, r) {}

    void setRad(float r);
    float getRad();
    float calculateArea();
};

#endif
