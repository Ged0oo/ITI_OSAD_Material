#include "picture.h"


Picture::Picture() : count(0), capacity(10) {
    shapes = new Shape*[capacity];
}


Picture::~Picture() {
    for (int i = 0; i < count; ++i) {
        delete shapes[i];
    }
    delete[] shapes;
}


void Picture::resize() {
    capacity *= 2;
    Shape** newShapes = new Shape*[capacity];
    for (int i = 0; i < count; ++i) newShapes[i] = shapes[i];
    delete[] shapes;
    shapes = newShapes;
}


void Picture::addShape(Shape* sh) {
    if (count == capacity) resize();
    shapes[count++] = sh;
}


void Picture::paint() {
    std::cout << "\n--- Picture Content ---\n";
    for (int i = 0; i < count; ++i) shapes[i]->draw();
}
