#include "library.h"

int main() {
    clearScreen();

    printMsgWithColorInPosition("Mohamed", RED_COLOR, 4, 4);
    delay_s(1);

    printMsgWithColorInPosition("Nagy", GREEN_COLOR, 12, 8);
    delay_ms(1000);

    printMsgWithColorInPosition("Mabrock", BLUE_COLOR, 4, 12);
    delay_ms(1000);

    resetColor();
    return 0;
}
