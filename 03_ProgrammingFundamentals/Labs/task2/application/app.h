#ifndef __APP_H__
#define __APP_H__

#include "../keyboard/keyboard.h"
#include "../screen/screen.h"

#define Y_POSITION           5
#define CURSER_POSITION      0

#define NEW_POSITION         2
#define DISPLAY_POSITION     3
#define EXIT_POSITION        4

#define NEW_MESSAGE             "NEW"
#define DISPLAY_MESSAGE         "DISPLAY"
#define EXIT_MESSAGE            "EXIT"


void init();
void updateScreen();
void setCurserPosition(int position);
void applicationLoop();
void HandleUserSelection(int pos);

#endif