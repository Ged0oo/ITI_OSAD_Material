#include "square.h"

float Square::getSide() { return d1; }

void Square::setSide(float s) {
    d1 = d2 = s;
}

float Square::calculateArea() {
    return d1 * d1;
}
