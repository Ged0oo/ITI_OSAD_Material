#ifndef __TRIANGLE_H__
#define __TRIANGLE_H__

#include "../GeoShape/Geoshape.h"

class Triangle : public Geoshape {
public:
    Triangle(float base, float height) : Geoshape(base, height) {}

    float calculateArea();
};

#endif
