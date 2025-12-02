#include "Geoshape.h"

Geoshape::Geoshape(float d1, float d2) {
    this->d1 = d1;
    this->d2 = d2;
}

void Geoshape::setD1(float d1){ this->d1 = d1; }
void Geoshape::setD2(float d2){ this->d2 = d2; }

float Geoshape::getD1(){ return d1; }
float Geoshape::getD2(){ return d2; }
