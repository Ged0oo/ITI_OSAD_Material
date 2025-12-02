#ifndef __GEO_SHAPE_H__
#define __GEO_SHAPE_H__

class Geoshape {
protected:
    float d1, d2;

public:
    Geoshape(float d1 = 0, float d2 = 0);

    void setD1(float d1);
    void setD2(float d2);

    float getD1();
    float getD2();
};

#endif
