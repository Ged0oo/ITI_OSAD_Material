#ifndef __LIST_H__
#define __LIST_H__


#include "../BaseType/basetype.h"
#include <iostream>
using namespace std;


class List {
private:
    basetype **data;
    int cap;
    int size;

public:
    List(int capacity = 8);
    ~List();

    void add(basetype *obj);
    void add(int v);
    void add(float v);
    void add(char v);
    void add(const string& v);
    void add(const char* v);
    basetype* get(int idx);

    int getSize();
    int getCap();

    void setSize(int size);
    void setCap(int cap);
};


void printListContent(List&);

#endif
