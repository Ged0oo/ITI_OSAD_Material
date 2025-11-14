#include "app.h"

bool selectFlag = false;
int curPos = NEW_POSITION;

void init(){
    hideCursor();
    atexit(showCursor);
    atexit(restoreTerminal);
    updateScreen();
}

void updateScreen(){
    if(selectFlag == false){
        clearScreen();
        printMsgWithColorInPosition(NEW_MESSAGE, WHITE_COLOR, Y_POSITION, NEW_POSITION);
        printMsgWithColorInPosition(DISPLAY_MESSAGE, WHITE_COLOR, Y_POSITION, DISPLAY_POSITION);
        printMsgWithColorInPosition(EXIT_MESSAGE, WHITE_COLOR, Y_POSITION, EXIT_POSITION);
    }
}

void setCurserPosition(int position){
    if(selectFlag == false){
        updateScreen();
        printMsgWithColorInPosition("->", WHITE_COLOR, CURSER_POSITION, position);
    }
}

void applicationLoop() {
    const int MIN_POS = NEW_POSITION;
    const int MAX_POS = EXIT_POSITION;
    const int STEP = CURSER_STEP;
    const int ITEMS = (MAX_POS - MIN_POS) / STEP + 1;

    int idx = 0;
    curPos = MIN_POS + idx * STEP;

    while (1) {
        setCurserPosition(curPos);
        int ch = getKey();

        switch (ch) {
            case ENTER_KEYBOARD_STROKE:
                selectFlag = true;
                HandleUserSelection(curPos);
                break;

            case BACKSPACE_KEYBOARD_STROKE:
                selectFlag = false;
                break;

            case UP_KEYBOARD_STROKE:
            case RIGHT_KEYBOARD_STROKE:
                if (!selectFlag) idx--;
                break;

            case DOWN_KEYBOARD_STROKE:
            case LEFT_KEYBOARD_STROKE:
                if (!selectFlag) idx++;
                break;

            case HOME_KEYBOARD_STROKE:
                if (!selectFlag) idx = 0;
                break;

            case END_KEYBOARD_STROKE:
                if (!selectFlag) idx = ITEMS - 1;
                break;

            default: continue;
        }

        idx = (idx % ITEMS + ITEMS) % ITEMS;
        curPos = MIN_POS + idx * STEP;
    }
}

void HandleUserSelection(int pos){
    clearScreen();
    switch (pos) {
        case NEW_POSITION:      printMsgWithColorInPosition(NEW_MESSAGE, RED_COLOR, Y_POSITION, NEW_POSITION);           break;
        case DISPLAY_POSITION:  printMsgWithColorInPosition(DISPLAY_MESSAGE, GREEN_COLOR, Y_POSITION, DISPLAY_POSITION); break;
        case EXIT_POSITION:     printMsgWithColorInPosition(EXIT_MESSAGE, BLUE_COLOR, Y_POSITION, EXIT_POSITION);        break;
    }
    printMsgWithColorInPosition("->", WHITE_COLOR, CURSER_POSITION, pos);
}