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


int getKey();
int decodeEscapeSequence();
int readChar();
void enableRowMode();
void restoreTerminal();
void printDetectedKey();

#endif