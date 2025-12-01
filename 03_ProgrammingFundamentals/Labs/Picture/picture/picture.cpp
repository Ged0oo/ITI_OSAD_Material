#include "picture.h"
#include <iostream>
using namespace std;

Picture::Picture() : count(0) {}

Picture::~Picture() {
    for(int i = 0; i < count; i++)
        delete arr[i];
}

void Picture::addShape(Shape* sh) {
    if(count < 10) arr[count++] = sh;
    else cout << "Picture is full!" << endl;
}

void Picture::paint() {
    cout << "\n--- Picture Content ---\n";
    for (int i = 0; i < count; i++)
        arr[i]->draw();
}
