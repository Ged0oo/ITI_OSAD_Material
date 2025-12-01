#include "picture.h"
#include <iostream>

Picture::~Picture() {
    for (Shape* sh : shapes) {
        delete sh;
    }
}

void Picture::addShape(Shape* sh) {
    shapes.push_back(sh);
}

void Picture::paint() {
    std::cout << "\n--- Picture Content ---\n";
    for (Shape* sh : shapes) {
        sh->draw();
    }
}
