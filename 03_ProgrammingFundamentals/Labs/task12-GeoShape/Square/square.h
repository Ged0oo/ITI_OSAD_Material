#ifndef __SQUARE_H__
#define __SQUARE_H__

#include "../Rect/rect.h"

class Square : private Rect {
public:
    Square(float s) : Rect(s, s) {}

    float getSide();
    void setSide(float s);
    float calculateArea();
};

#endif
