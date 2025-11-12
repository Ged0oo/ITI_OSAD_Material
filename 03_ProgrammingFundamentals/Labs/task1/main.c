#include "library.h"

int main() {
    clearScreen();

    setColor(RED_COLOR);
    gotoxy(4, 4);
    printf("Mohamed\n");
    fflush(stdout);
    delay_s(1);

    setColor(BLUE_COLOR);
    gotoxy(4, 8);
    printf("Nagy\n");
    fflush(stdout);
    delay_ms(1000);

    resetColor();
    gotoxy(1, 12);
    printf("Done\n");

    return 0;
}
