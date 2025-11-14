#include "app.h"

int curPos = NEW_POSITION;

void init(){
    hideCursor();
    atexit(showCursor);
    atexit(restoreTerminal);
    updateScreen();
}

void updateScreen(){
    clearScreen();
    printMsgWithColorInPosition("New", RED_COLOR, Y_POSITION, NEW_POSITION);
    printMsgWithColorInPosition("Display", GREEN_COLOR, Y_POSITION, DISPLAY_POSITION);
    printMsgWithColorInPosition("Exit", BLUE_COLOR, Y_POSITION, EXIT_POSITION);
}

void setCurserPosition(int position){
    updateScreen();
    printMsgWithColorInPosition("->", WHITE_COLOR, CURSER_POSITION, position);
}

void applicationLoop() {
    const int MIN_POS = NEW_POSITION;
    const int MAX_POS = EXIT_POSITION;
    const int RANGE = MAX_POS - MIN_POS + 1;

    int curPos = MIN_POS;

    while (1) {
        setCurserPosition(curPos);
        int ch = getKey();

        switch (ch) {
            case UP_KEYBOARD_STROKE:
            case RIGHT_KEYBOARD_STROKE:
                curPos -= 1; break;

            case DOWN_KEYBOARD_STROKE:
            case LEFT_KEYBOARD_STROKE:
                curPos += 1; break;

            case HOME_KEYBOARD_STROKE:
                curPos = MIN_POS;
                break;

            case END_KEYBOARD_STROKE:
                curPos = MAX_POS; break;

            default: continue;
        }

        curPos = MIN_POS + ((curPos - MIN_POS) % RANGE + RANGE) % RANGE;
    }
}

