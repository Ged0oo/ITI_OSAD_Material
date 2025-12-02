#ifndef __RECT_H__
#define __RECT_H__

#include "../GeoShape/Geoshape.h"

class Rect : public Geoshape{
public:
    Rect(float s1, float s2) : Geoshape(s1, s2) {}

    float calculateArea();
};

#endif
