#include "circle.h"

void Circle::setRad(float r){
    d1 = d2 = r;
}

float Circle::getRad(){
    return d1;
}

float Circle::calculateArea(){
    return 3.14f * d1 * d2;
}
