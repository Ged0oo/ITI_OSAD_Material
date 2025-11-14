#ifndef __APP_H__
#define __APP_H__

#include "../keyboard/keyboard.h"
#include "../screen/screen.h"

#define Y_POSITION           5
#define CURSER_POSITION      0

#define NEW_POSITION         3
#define DISPLAY_POSITION     4
#define EXIT_POSITION        5



void init();
void updateScreen();
void setCurserPosition(int position);
void applicationLoop();

#endif