#include "keyboard.h"
#include <iostream>
#include <termios.h>
#include <unistd.h>
using namespace std;

termios originalTerminal;

void restoreTerminal() {
    tcsetattr(STDIN_FILENO, TCSANOW, &originalTerminal);
}

void enableRowMode() {
    static bool enabled = false;
    if (enabled) return;

    tcgetattr(STDIN_FILENO, &originalTerminal);

    termios temp = originalTerminal;
    temp.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &temp);

    atexit(restoreTerminal); 
    enabled = true;
}

int readChar() {
    enableRowMode();
    return getchar();
}

int decodeEscapeSequence() {
    int c2 = readChar(); // '[' or 'O'
    if (c2 != '[' && c2 != 'O') return 27; // plain ESC

    int c3 = readChar();

    // ESC O H / F
    if (c2 == 'O') {
        if (c3 == 'H') return 1005; // HOME
        if (c3 == 'F') return 1006; // END
        return 27;
    }

    // Arrows + Home/End
    switch (c3) {
        case 'A': return 1001; // UP
        case 'B': return 1002; // DOWN
        case 'C': return 1003; // RIGHT
        case 'D': return 1004; // LEFT
        case 'H': return 1005; // HOME
        case 'F': return 1006; // END
    }

    // ESC [ 1 ~ or ESC [ 4 ~
    if (c3 == '1') {
        if (readChar() == '~') return 1005;
    }
    if (c3 == '4') {
        if (readChar() == '~') return 1006;
    }

    return 27;
}

int getKey() {
    int ch = readChar();

    // ENTER (LF)
    if (ch == 10) return 1007;       // ENTER_KEYBOARD_STROKE

    // BACKSPACE
    if (ch == 127) return 1008;       // BACKSPACE_KEYBOARD_STROKE

    // Normal key
    if (ch != 27)
        return ch;

    // ESC sequence
    return decodeEscapeSequence();
}

void printDetectedKey() {
    int ch = getKey();
    string str;

    switch (ch) {
        case 27:    str = "ESC"; break;
        case 1001:  str = "UP"; break;
        case 1002:  str = "DOWN"; break;
        case 1003:  str = "RIGHT"; break;
        case 1004:  str = "LEFT"; break;
        case 1005:  str = "HOME"; break;
        case 1006:  str = "END"; break;
        case 1007:  str = "ENTER"; break;
        case 1008:  str = "BACKSPACE"; break;
        default:
            cout << "Char: " << (char)ch << " (" << ch << ")" << endl;
            return;
    }

    cout << "You pressed: " << str << endl;
}
