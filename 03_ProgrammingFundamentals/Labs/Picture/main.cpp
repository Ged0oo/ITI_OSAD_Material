#include <iostream>

using namespace std;

class Point {
private:
    int x, y;
public:
    Point(){ Point(0, 0); }
    Point(int x,int y){ this->x = x; this->y = y; }
    void print_point(){
        cout << "(" << x << ", " << y << ")";
    }
};

class Line{
private:
    Point p1, p2;
public:
    Line(){}
    Line(Point p1, Point p2){this->p1 = p1; this->p2 = p2;}
    void draw() {
        cout << "Line: ";
        p1.print_point();
        cout << " -> ";
        p2.print_point();
        cout << endl;
    }
};

class Rect{
private:
    Point topLeft, buttomRight;
public:
    Rect(){}
    Rect(Point p1, Point p2){this->topLeft = p1; this->buttomRight = p2;}
    void draw() {
        cout << "Rectangle: ";
        topLeft.print_point();
        cout << " to ";
        buttomRight.print_point();
        cout << endl;
    }
};

class Circle{
private:
    Point centre;
    int radius;
public:
    Circle(){}
    Circle(Point c, int r){this->centre = c; this->radius = r;}
    void draw() {
        cout << "Circle: center ";
        centre.print_point();
        cout << " radius=" << radius << endl;
    }
};

class Picture{
private:
    Line lines[10];
    Rect rects[10];
    Circle circles[10];
    int countLines, countRects, countCircles;
public:
    Picture(){countCircles=0; countLines=0; countRects=0;}
    
    void addLine(Line l){lines[countLines++] = l;}
    void addRect(Rect r){rects[countRects++] = r;}
    void addCircle(Circle c){circles[countCircles++] = c;}

    void paint() {
        cout << "\n--- Picture ---\n";

        for (int i = 0; i < countLines; i++)
            lines[i].draw();

        for (int i = 0; i < countRects; i++)
            rects[i].draw();

        for (int i = 0; i < countCircles; i++)
            circles[i].draw();
    }
};


int main() {

    Picture p;

    p.addLine(Line(Point(0,0), Point(5,5)));
    p.addRect(Rect(Point(2,2), Point(8,6)));
    p.addCircle(Circle(Point(4,4), 3));

    p.paint();

    return 0;
}
