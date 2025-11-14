#ifndef __APP_H__
#define __APP_H__

#include "../keyboard/keyboard.h"
#include "../screen/screen.h"

#define Y_POSITION           70
#define CURSER_POSITION      65

#define NEW_POSITION         6
#define DISPLAY_POSITION     7
#define EXIT_POSITION        8

#define NEW_MESSAGE             "NEW"
#define DISPLAY_MESSAGE         "DISPLAY"
#define EXIT_MESSAGE            "EXIT"


void init();
void updateScreen();
void setCurserPosition(int position);
void applicationLoop();
void HandleUserSelection(int pos);

#endif