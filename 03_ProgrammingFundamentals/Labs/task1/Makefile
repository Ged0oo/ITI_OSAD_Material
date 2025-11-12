TCH = gcc
OPT = -Wall -Wextra -std=c11
SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)
TARGET = app

.PHONY: all clean

all: $(TARGET)

# Build object files
%.o: %.c
	@$(TCH) $(OPT) -c $< -o $@

# Preprocessed file
%.i: %.c
	@$(TCH) $(OPT) -E $< -o $@

# Assembly file
%.s: %.c
	@$(TCH) $(OPT) -S $< -o $@

# Link executable
$(TARGET): $(OBJ)
	@$(TCH) $(OBJ) -o $(TARGET)
	@echo "Build complete: $(TARGET)"

clean:
	@rm -f $(TARGET) *.o *.s *.i *.elf
	@echo "Cleaned build files"
