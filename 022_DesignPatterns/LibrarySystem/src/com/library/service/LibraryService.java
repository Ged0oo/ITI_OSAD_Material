package com.library.service;

import com.library.model.Book;
import com.library.model.User;

import java.util.ArrayList;
import java.util.List;

public class LibraryService {
    private static LibraryService instnace;

    private LibraryService() {}

    public static LibraryService getInstance(){
        if(instnace == null){
            instnace = new LibraryService();
        }
        return instnace;
    }

    public final List<Book> books = new ArrayList<>();

    public void addBook(Book book){
        books.add(book);
        System.out.println("Added: " + book);
    }

    public Book findBook(String title){
        for(Book book : books){
            if (book.getTitle().equalsIgnoreCase(title)) {
                return book;
            }
        }
        return null;
    }

    public void borrowBook(String title, User user) {
        Book book = findBook(title);
        if (book != null) {
            book.borrowBook(user);
        } else {
            System.out.println("Book not found: \"" + title + "\"");
        }
    }

    public void returnBook(String title) {
        Book book = findBook(title);
        if (book != null) {
            book.returnBook();
        } else {
            System.out.println("Book not found: \"" + title + "\"");
        }
    }

    public void listBooks() {
        System.out.println("\n═════════ Library Catalog ═════════");
        if (books.isEmpty()) {
            System.out.println("  (empty)");
        }
        for (Book book : books) {
            System.out.println("  " + book);
        }
        System.out.println("══════════════════════════════════════\n");
    }
}
