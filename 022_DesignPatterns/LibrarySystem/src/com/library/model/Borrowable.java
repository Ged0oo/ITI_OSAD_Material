package com.library.model;

public interface Borrowable {
    void borrowBook(User user);
    void returnBook();
    String getTitle();
    boolean isAvailable();
}
