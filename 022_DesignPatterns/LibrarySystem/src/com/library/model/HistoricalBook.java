package com.library.model;

public class HistoricalBook extends Book {

    public HistoricalBook(String title) {super(title);}

    @Override
    public void borrowBook(User user) {
        if (!user.isPremium()) {
            System.out.println("[Historical] ACCESS DENIED: \"" + getTitle() + "\" — only premium users can borrow" + " historical books. (" + user.getName() + ")");
            return;
        }

        if (isAvailable()) {
            setAvailable(false);
            System.out.println("[Historical] \"" + getTitle() + "\" has been borrowed by " + user.getName() + ".");
        } else {
            System.out.println("[Historical] \"" + getTitle() + "\" is not available.");
        }
    }

    @Override
    public void returnBook() {
        if (!isAvailable()) {
            setAvailable(true);
            System.out.println("[Historical] \"" + getTitle() + "\" has been returned.");
        } else {
            System.out.println("[Historical] \"" + getTitle() + "\" was not borrowed.");
        }
    }
}