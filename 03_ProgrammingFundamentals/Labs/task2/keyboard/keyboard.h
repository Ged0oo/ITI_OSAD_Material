#ifndef __KEYBOARD_H__
#define __KEYBOARD_H__


#include <iostream>
#include <string>
#include <termios.h>
#include <unistd.h>

using namespace std;

#if defined(_WIN32) || defined(_WIN64)
#include <windows.h>
#include <conio.h>
#else
#include <unistd.h>
#include <time.h>
#endif

extern termios originalTerminal;


#define ESC_KEYBOARD_STROKE        27
#define UP_KEYBOARD_STROKE         1001
#define DOWN_KEYBOARD_STROKE       1002
#define RIGHT_KEYBOARD_STROKE      1003
#define LEFT_KEYBOARD_STROKE       1004
#define HOME_KEYBOARD_STROKE       1005
#define END_KEYBOARD_STROKE        1006


int getKey();
int decodeEscapeSequence();
int readChar();
void enableRowMode();
void restoreTerminal();
void printDetectedKey();

#endif