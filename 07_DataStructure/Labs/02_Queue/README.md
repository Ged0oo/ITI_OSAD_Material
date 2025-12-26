# Queue/Dequeue Data Structure Implementation

## Lab 02: Queue Implementation

This project implements a **Double-Ended Queue (Deque)** data structure in C++ using a circular array. The implementation supports both queue (FIFO) and stack (LIFO) operations.

## Project Structure

```
02_Queue/
├── main.cpp              # Main test program
├── Makefile              # Build configuration
├── Queue/
│   ├── Queue.h          # Class declaration and interface
│   └── Queue.cpp        # Class implementation
└── README.md            # This documentation
```

## Features

- **Circular Array Implementation**: Efficient use of fixed-size array with wrap-around
- **Double-Ended Operations**: Insert/delete from both front and rear
- **Boundary Checking**: Proper handling of full/empty conditions
- **Memory Management**: Dynamic allocation with proper cleanup
- **Comprehensive Testing**: Complete test suite in main.cpp

## Class Interface (Queue.h)

```cpp
class Queue {
private:
    int *items;        // Dynamic array to store elements
    int rear, front;   // Position indices
    int cap;          // Maximum capacity

public:
    Queue(int cap);                    // Constructor with capacity
    ~Queue();                         // Destructor for cleanup

    // Core Operations
    void insertRear(int item);        // Add element to rear (enqueue)
    int deleteFront();                // Remove element from front (dequeue)
    void insertFront(int item);       // Add element to front
    int deleteRear();                 // Remove element from rear

    // Utility Operations
    void display();                   // Print all elements
    bool isFull();                    // Check if queue is full
    bool isEmpty();                   // Check if queue is empty
};
```

## Implementation Details

### Constructor & Destructor
```cpp
Queue::Queue(int cap) {
    this->cap = cap;              // Store capacity
    items = new int[cap];         // Allocate dynamic array
    front = rear = -1;            // Initialize indices (empty state)
}

Queue::~Queue() {
    delete[] items;               // Free allocated memory
}
```

### Boundary Conditions
```cpp
bool Queue::isFull() {
    return front == (rear + 1) % cap;  // Circular wrap-around check
}

bool Queue::isEmpty() {
    return front == -1;           // Special empty state
}
```

### Insert Operations

**Insert Rear (Enqueue):**
```cpp
void Queue::insertRear(int item) {
    if(isFull()) {
        cout << "Queue is Full" << endl;
        return;
    }
    else if(isEmpty()) {
        rear = front = 0;         // First element case
    }
    else {
        rear = (rear + 1) % cap;  // Circular increment
    }
    items[rear] = item;           // Store the item
}
```

**Insert Front:**
```cpp
void Queue::insertFront(int item) {
    if(isFull()) {
        cout << "Queue is Full" << endl;
        return;
    }
    else if(isEmpty()) {
        rear = front = 0;         // First element case
    }
    else {
        front = (front - 1 + cap) % cap;  // Circular decrement
    }
    items[front] = item;          // Store the item
}
```

### Delete Operations

**Delete Front (Dequeue):**
```cpp
int Queue::deleteFront() {
    if(isEmpty()) {
        cout << "The Queue is Empty" << endl;
        return -1;                // Error indicator
    }
    int ret = items[front];       // Get element to return
    if(front == rear) {
        front = rear = -1;        // Last element removed
    }
    else {
        front = (front + 1) % cap;  // Circular increment
    }
    return ret;                   // Return removed element
}
```

**Delete Rear:**
```cpp
int Queue::deleteRear() {
    if(isEmpty()) {
        cout << "The Queue is Empty" << endl;
        return -1;                // Error indicator
    }
    int ret = items[rear];        // Get element to return
    if(front == rear) {
        front = rear = -1;        // Last element removed
    }
    else {
        rear = (rear - 1 + cap) % cap;  // Circular decrement
    }
    return ret;                   // Return removed element
}
```

### Display Function
```cpp
void Queue::display() {
    if(isEmpty()) {
        cout << "Empty Queue";
        return;
    }

    cout << "\n========================================\n";
    int i = front % cap;          // Start from front
    while(i != rear) {            // Loop until rear
        cout << items[i] << "\t";
        i = (i + 1) % cap;        // Circular traversal
    }
    cout << items[rear];          // Print last element
    cout << "\n========================================\n";
}
```

## Building and Running

### Using Makefile (Recommended)
```bash
# Build the project
make

# Clean build files
make clean

# Build with debug symbols
make debug
```

### Manual Compilation
```bash
# Compile with g++
g++ -std=c++17 -o queue_app main.cpp Queue/Queue.cpp

# Run the program
./queue_app
```

## Test Cases (main.cpp)

The test program demonstrates all deque operations:

1. **Insert Rear Operations**: Adds elements 10, 20, 30 to rear
2. **Insert Front Operations**: Adds elements 5, 1 to front
3. **Delete Front**: Removes element from front
4. **Delete Rear**: Removes element from rear
5. **Full Queue Test**: Attempts insertion when queue is full
6. **Empty Queue Test**: Attempts deletion when queue is empty

### Expected Output
```
=== Deque (Double-Ended Queue) Implementation Test ===

Testing insertRear operations:
After inserting 10, 20, 30 from rear:
========================================
10      20      30
========================================

Testing insertFront operations:
After inserting 5, 1 from front:
========================================
1       5       10      20      30
========================================

Testing deleteFront operation:
Deleted from front: 1
Queue after deleteFront:
========================================
5       10      20      30
========================================

Testing deleteRear operation:
Deleted from rear: 30
Queue after deleteRear:
========================================
5       10      20
========================================

Testing full queue condition:
After adding more elements:
========================================
5       10      20      40      50
========================================
Trying to insert when full:
Queue is Full

Testing empty queue condition:
After emptying the queue:
Empty Queue
Trying to delete from empty queue:
The Queue is Empty
The Queue is Empty
```

## Key Concepts Demonstrated

1. **Circular Array**: Efficient fixed-size buffer with wrap-around
2. **Modulo Arithmetic**: Handling circular indices
3. **Boundary Conditions**: Proper full/empty state management
4. **Memory Management**: Dynamic allocation and deallocation
5. **Error Handling**: Graceful handling of invalid operations
6. **Double-Ended Operations**: Both queue and stack functionality

## Learning Objectives

This implementation demonstrates:
- Abstract Data Type (ADT) implementation
- Circular buffer data structure
- Memory management in C++
- Boundary condition testing
- Modular arithmetic applications
- Class design and encapsulation

## Technical Details

- **Time Complexity**: O(1) for all operations
- **Space Complexity**: O(capacity)
- **Memory Usage**: Fixed size, no dynamic resizing
- **Thread Safety**: Not thread-safe (single-threaded design)
- **Error Handling**: Returns -1 for empty queue operations

---

**Course**: Data Structures - Lab 02
**Institution**: ITI (Information Technology Institute)
**Implementation**: Circular Array-based Deque</content>
<parameter name="filePath">/home/nagy/Mine/ITI/07_DataStructure/Labs/02_Queue/README.md