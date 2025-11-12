#include "library.h"

void gotoxy(int x, int y) {
#if defined(_WIN32) || defined(_WIN64)
    COORD coord = {x - 1, y - 1};
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
#else
    printf("\033[%d;%dH", y, x);
#endif
}

void setColor(Color_t color) {
#if defined(_WIN32) || defined(_WIN64)
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
#else
    printf("\033[0;3%dm", color);
#endif
}

void resetColor() {
#if defined(_WIN32) || defined(_WIN64)
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
#else
    printf("\033[0m");
#endif
}

void clearScreen() {
#if defined(_WIN32) || defined(_WIN64)
    system("cls");
#else
    printf("\033[2J");
    printf("\033[H");
#endif
}

void delay_ms(int ms) {
#if defined(_WIN32) || defined(_WIN64)
    Sleep(ms);
#else
    struct timespec ts;
    ts.tv_sec = ms / 1000;
    ts.tv_nsec = (ms % 1000) * 1000000;
    nanosleep(&ts, NULL);
#endif
}

void delay_s(int sec) {
#if defined(_WIN32) || defined(_WIN64)
    Sleep(sec * 1000);
#else
    sleep(sec);
#endif
}
