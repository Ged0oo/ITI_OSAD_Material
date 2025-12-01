#ifndef __LIBRARY_H__
#define __LIBRARY_H__


#include <iostream>
#include <string>

using namespace std;

#if defined(_WIN32) || defined(_WIN64)
#include <windows.h>
#else
#include <unistd.h>
#include <time.h>
#endif


typedef enum {
    BLACK_COLOR   =  0,
    RED_COLOR     =  1,
    GREEN_COLOR   =  2,
    BLUE_COLOR    =  4,
    WHITE_COLOR   =  7
} Color_t;


void clearScreen();
void gotoxy(int x, int y);

void setColor(Color_t color);
void resetColor();

void printMessage(const string& msg);
void printMsgWithColorInPosition(const string& msg, Color_t color, int x, int y);

void delay_s(int sec);


#endif