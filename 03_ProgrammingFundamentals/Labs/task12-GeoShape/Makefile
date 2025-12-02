TCH = g++
OPT = -Wall -Wextra -std=c++17

# --- Directories ---
SRC_DIRS := . Circle GeoShape Rect Square Triangle
BUILD_DIR := build/Debug
TARGET := app

# --- File Detection ---
SRC := $(foreach dir,$(SRC_DIRS),$(wildcard $(dir)/*.cpp))
OBJ := $(patsubst %.cpp,$(BUILD_DIR)/%.o,$(SRC))
ASM := $(patsubst %.cpp,$(BUILD_DIR)/%.s,$(SRC))
PRE := $(patsubst %.cpp,$(BUILD_DIR)/%.i,$(SRC))
 
# --- OS Detection ---
ifeq ($(OS),Windows_NT)
	CLEAN = del /Q /F
	EXT = .exe
	MKDIR = if not exist "$(subst /,\\,$(BUILD_DIR))" mkdir "$(subst /,\\,$(BUILD_DIR))"
else
	CLEAN = rm -f
	EXT =
	MKDIR = mkdir -p $(BUILD_DIR)
endif

.PHONY: all clean dirs

# --- Default Target ---
all: dirs $(TARGET)$(EXT)

# --- Create build directories ---
dirs:
	@$(MKDIR)
	@for d in $(SRC_DIRS); do mkdir -p $(BUILD_DIR)/$$d; done

# --- Compile source files ---
$(BUILD_DIR)/%.o: %.cpp
	@$(TCH) $(OPT) -c $< -o $@

# --- Generate preprocessed files ---
$(BUILD_DIR)/%.i: %.cpp
	@$(TCH) $(OPT) -E $< -o $@

# --- Generate assembly files ---
$(BUILD_DIR)/%.s: %.cpp
	@$(TCH) $(OPT) -S $< -o $@

# --- Link final binary ---
$(TARGET)$(EXT): $(OBJ)
	@$(TCH) $(OBJ) -o $(TARGET)$(EXT)
	@echo Build complete: $(TARGET)$(EXT)

# --- Clean build ---
clean:
	@$(CLEAN) $(TARGET)$(EXT) nul $(BUILD_DIR)/*/*.o $(BUILD_DIR)/*/*.s $(BUILD_DIR)/*/*.i 2>nul || true
	@echo Cleaned build files
