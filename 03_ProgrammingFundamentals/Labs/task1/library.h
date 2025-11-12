#ifndef __LIBRARY_H__
#define __LIBRARY_H__


#include <stdio.h>
#if defined(_WIN32) || defined(_WIN64)
#include <windows.h>
#else
#include <unistd.h>
#include <time.h>
#endif


// #define BLACK_COLOR     0
// #define RED_COLOR       1
// #define GREEN_COLOR     2
// #define BLUE_COLOR      4
// #define WHITE_COLOR     7


typedef enum {
    BLACK_COLOR   =  0,
    RED_COLOR     =  1,
    GREEN_COLOR   =  2,
    BLUE_COLOR    =  4,
    WHITE_COLOR   =  7
} Color_t;

void gotoxy(int x, int y);
void setColor(Color_t color);
void resetColor();
void clearScreen();
void delay_ms(int ms);
void delay_s(int sec);


#endif