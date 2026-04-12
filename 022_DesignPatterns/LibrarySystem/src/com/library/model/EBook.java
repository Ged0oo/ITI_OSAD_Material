package com.library.model;

public class EBook extends Book {

    public EBook(String title) {super(title);}

    @Override
    public void borrowBook(User user) {
        if (isAvailable()) {
            setAvailable(false);
            System.out.println("[E-Book] \"" + getTitle() + "\" has been borrowed by " + user.getName() + ".");
        } else {
            System.out.println("[E-Book] \"" + getTitle() + "\" is not available.");
        }
    }

    @Override
    public void returnBook() {
        if (!isAvailable()) {
            setAvailable(true);
            System.out.println("[E-Book] \"" + getTitle() + "\" has been returned.");
        } else {
            System.out.println("[E-Book] \"" + getTitle() + "\" was not borrowed.");
        }
    }
}