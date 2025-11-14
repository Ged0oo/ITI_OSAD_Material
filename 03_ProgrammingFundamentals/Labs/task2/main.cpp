#include "main.h"

int main() {
    atexit(restoreTerminal);
    while (1) {
        printDetectedKey();
    }
    return 0;
}
