package library.model;

public class Book extends LibraryItem {
    private String author;

    public Book(String id, String title, String author) {
        super(id, title);
        this.author = author;
    }

    public Book(){}

    public void setAuthor(String author) {this.author = author;}
    public String getAuthor(){return this.author;}

    @Override
    public String getItemDetails() {
        return "Book [ID: " + getId() + ", Title: " + getTitle() + ", Author: " + this.author + "]";
    }

    @Override
    public void update(Object newData) {
        super.update(newData);
        if (newData instanceof Book) {
            Book newBook = (Book) newData;
            this.setAuthor(newBook.getAuthor());
        }
    }
}