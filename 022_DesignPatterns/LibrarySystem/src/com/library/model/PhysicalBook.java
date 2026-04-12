package com.library.model;

public class PhysicalBook extends Book{
    public PhysicalBook(String title) {
        super(title);
    }

    @Override
    public void borrowBook(User user){
        if (isAvailable()) {
            setAvailable(false);
            System.out.println("[Physical] \"" + getTitle() + "\" has been borrowed by " + user.getName() + ".");
        } else {
            System.out.println("[Physical] \"" + getTitle() + "\" is not available.");
        }
    }

    @Override
    public void returnBook() {
        if (!isAvailable()) {
            setAvailable(true);
            System.out.println("[Physical] \"" + getTitle() + "\" has been returned.");
        } else {
            System.out.println("[Physical] \"" + getTitle() + "\" was not borrowed.");
        }
    }
}
