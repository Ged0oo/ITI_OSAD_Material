TCH = g++
OPT = -Wall -Wextra -std=c++17
SRC = $(wildcard *.cpp)
OBJ = $(SRC:.cpp=.o)
TARGET = app


# Detect OS
ifeq ($(OS),Windows_NT)
	CLEAN = del /Q /F
	EXT = .exe
else
	CLEAN = rm -f
	EXT =
endif


.PHONY: all clean


all: $(TARGET)$(EXT)


# Compile source files to object files
%.o: %.cpp
	@$(TCH) $(OPT) -c $< -o $@


# Generate preprocessed files
%.i: %.cpp
	@$(TCH) $(OPT) -E $< -o $@


# Generate assembly files
%.s: %.cpp
	@$(TCH) $(OPT) -S $< -o $@


# Link object files into final executable
$(TARGET)$(EXT): $(OBJ)
	@$(TCH) $(OBJ) -o $(TARGET)$(EXT)
	@echo Build complete: $(TARGET)$(EXT)


clean:
	@$(CLEAN) $(TARGET)$(EXT) *.o *.s *.i *.elf 2>nul || true
	@echo Cleaned build files
