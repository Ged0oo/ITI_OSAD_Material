package com.library.model;

public abstract class Book implements Borrowable {
    private String title;
    private boolean isAvailable;

    public Book(String title) {
        this.title = title;
        this.isAvailable = true;
    }

    @Override
    public String getTitle() {return title;}

    @Override
    public boolean isAvailable() {return isAvailable;}

    protected void setAvailable(boolean available) {this.isAvailable = available;}

    @Override
    public void borrowBook(User user) {
        if (isAvailable) {
            isAvailable = false;
            System.out.println(user.getName() + " borrowed: " + title);
        } else {
            System.out.println("\"" + title + "\" is not available.");
        }
    }

    @Override
    public void returnBook() {
        if (!isAvailable) {
            isAvailable = true;
            System.out.println("\"" + title + "\" has been returned.");
        } else {
            System.out.println("\"" + title + "\" was not borrowed.");
        }
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{title='" + title
                + "', available=" + isAvailable + "}";
    }
}