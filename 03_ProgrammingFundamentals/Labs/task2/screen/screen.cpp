#include "screen.h"

void gotoxy(int x, int y) {
#if defined(_WIN32) || defined(_WIN64)
    COORD coord = {static_cast<SHORT>(x - 1), static_cast<SHORT>(y - 1)};
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
#else
    cout << "\033[" << y << ";" << x << "H";
#endif
}


void setColor(Color_t color) {
#if defined(_WIN32) || defined(_WIN64)
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), static_cast<SHORT>(color));
#else
    cout << "\033[0;3" << static_cast<int>(color) << "m";
#endif
}


void resetColor() {
#if defined(_WIN32) || defined(_WIN64)
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
#else
    cout << "\033[0m";
#endif
}


void clearScreen() {
#if defined(_WIN32) || defined(_WIN64)
    system("cls");
#else
    cout << "\033[2J\033[H";
#endif
}


#include <iostream>
using namespace std;

void hideCursor() {
    cout << "\033[?25l";
    cout.flush();
}

void showCursor() {
    cout << "\033[?25h";
    cout.flush();
}



void delay_s(int sec) {
#if defined(_WIN32) || defined(_WIN64)
    Sleep(sec * 1000);
#else
    sleep(sec);
#endif
}


void printMessage(const string& msg){
    cout << msg << endl;
    cout.flush();
}


void printMsgWithColorInPosition(const string& msg, Color_t color, int x, int y){
    setColor(color);
    gotoxy(x, y);
    printMessage(msg);
    resetColor();
}