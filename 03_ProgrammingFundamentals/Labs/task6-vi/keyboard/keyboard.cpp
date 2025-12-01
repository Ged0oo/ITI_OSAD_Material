#include "keyboard.h"
#include <iostream>
using namespace std;

#if !defined(_WIN32) && !defined(_WIN64)
termios originalTerminal;
#endif


void restoreTerminal() {

#if defined(_WIN32) || defined(_WIN64)
    return;
#else
    tcsetattr(STDIN_FILENO, TCSANOW, &originalTerminal);
#endif
}



void enableRowMode() {

#if defined(_WIN32) || defined(_WIN64)
    return;
#else
    static bool enabled = false;
    if (enabled) return;

    tcgetattr(STDIN_FILENO, &originalTerminal);

    termios temp = originalTerminal;
    temp.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &temp);

    atexit(restoreTerminal);
    enabled = true;
#endif
}



int readChar() {

#if defined(_WIN32) || defined(_WIN64)
    return _getch();
#else
    enableRowMode();
    return getchar();
#endif
}



int decodeEscapeSequence() {

#if defined(_WIN32) || defined(_WIN64)
    return ESC_KEYBOARD_STROKE;

#else
    int c2 = readChar(); 
    if (c2 != '[' && c2 != 'O')
        return ESC_KEYBOARD_STROKE;

    int c3 = readChar();

    if (c2 == 'O') {
        if (c3 == 'H') return HOME_KEYBOARD_STROKE;
        if (c3 == 'F') return END_KEYBOARD_STROKE;
        return ESC_KEYBOARD_STROKE;
    }

    switch (c3) {
        case 'A': return UP_KEYBOARD_STROKE;
        case 'B': return DOWN_KEYBOARD_STROKE;
        case 'C': return RIGHT_KEYBOARD_STROKE;
        case 'D': return LEFT_KEYBOARD_STROKE;
        case 'H': return HOME_KEYBOARD_STROKE;
        case 'F': return END_KEYBOARD_STROKE;
    }

    if (c3 == '1' && readChar() == '~') return HOME_KEYBOARD_STROKE;
    if (c3 == '4' && readChar() == '~') return END_KEYBOARD_STROKE;

    return ESC_KEYBOARD_STROKE;
#endif
}



int getKey() {
    int ch = readChar();

#if defined(_WIN32) || defined(_WIN64)

    if (ch == 13) return ENTER_KEYBOARD_STROKE;

    if (ch == 8) return BACKSPACE_KEYBOARD_STROKE;

    if (ch == 27) return ESC_KEYBOARD_STROKE;

    if (ch == 224) {
        int c2 = _getch();
        switch (c2) {
            case 72: return UP_KEYBOARD_STROKE;
            case 80: return DOWN_KEYBOARD_STROKE;
            case 75: return LEFT_KEYBOARD_STROKE;
            case 77: return RIGHT_KEYBOARD_STROKE;
            case 71: return HOME_KEYBOARD_STROKE;
            case 79: return END_KEYBOARD_STROKE;
        }
    }

    return ch;

#else

    if (ch == 10) return ENTER_KEYBOARD_STROKE;

    if (ch == 127) return BACKSPACE_KEYBOARD_STROKE;

    if (ch != 27) return ch;

    return decodeEscapeSequence();

#endif
}




void printDetectedKey() {
    int ch = getKey();
    string str;

    switch (ch) {
        case ESC_KEYBOARD_STROKE:       str = "ESC"; break;
        case UP_KEYBOARD_STROKE:        str = "UP"; break;
        case DOWN_KEYBOARD_STROKE:      str = "DOWN"; break;
        case RIGHT_KEYBOARD_STROKE:     str = "RIGHT"; break;
        case LEFT_KEYBOARD_STROKE:      str = "LEFT"; break;
        case HOME_KEYBOARD_STROKE:      str = "HOME"; break;
        case END_KEYBOARD_STROKE:       str = "END"; break;
        case ENTER_KEYBOARD_STROKE:     str = "ENTER"; break;
        case BACKSPACE_KEYBOARD_STROKE: str = "BACKSPACE"; break;
        default:
            cout << "Char: " << (char)ch << " (" << ch << ")\n";
            return;
    }

    cout << "You pressed: " << str << endl;
}
