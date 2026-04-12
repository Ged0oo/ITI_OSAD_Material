package com.library;

import com.library.factory.BookFactory;
import com.library.factory.BookFactory.BookType;
import com.library.model.User;
import com.library.service.LibraryService;


public class Main {
    public static void main(String[] args) {

        LibraryService library = LibraryService.getInstance();

        library.addBook(BookFactory.createBook(BookType.PHYSICAL,   "Harry Potter"));
        library.addBook(BookFactory.createBook(BookType.EBOOK,      "Lord of the Rings"));
        library.addBook(BookFactory.createBook(BookType.HISTORICAL, "The Art of War"));

        library.listBooks();

        User premiumUser = new User("Alice", true);
        User regularUser = new User("Bob", false);

        System.out.println("────── Borrowing Tests ──────");
        library.borrowBook("Harry Potter", premiumUser);
        library.borrowBook("Lord of the Rings", regularUser);
        library.borrowBook("The Art of War", regularUser);
        library.borrowBook("The Art of War", premiumUser);

        System.out.println("\n────── Double Borrow Test ──────");
        library.borrowBook("Harry Potter", regularUser);

        System.out.println("\n────── Return Tests ──────");
        library.returnBook("Harry Potter");
        library.returnBook("Harry Potter");

        System.out.println("\n────── Not Found Test ──────");
        library.borrowBook("Nonexistent Book", premiumUser);

        System.out.println("\n────── Singleton Verification ──────");
        LibraryService anotherRef = LibraryService.getInstance();
        System.out.println("Same instance? " + (library == anotherRef));

        library.listBooks();
    }
}