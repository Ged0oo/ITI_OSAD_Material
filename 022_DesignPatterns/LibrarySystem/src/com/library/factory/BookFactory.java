package com.library.factory;

import com.library.model.Book;
import com.library.model.EBook;
import com.library.model.HistoricalBook;
import com.library.model.PhysicalBook;

public class BookFactory {
    public enum BookType {
        PHYSICAL,
        EBOOK,
        HISTORICAL
    }

    public static Book createBook(BookType type, String title) {
        switch (type) {
            case PHYSICAL:
                return new PhysicalBook(title);
            case EBOOK:
                return new EBook(title);
            case HISTORICAL:
                return new HistoricalBook(title);
            default:
                throw new IllegalArgumentException("Unknown book type: " + type);
        }
    }
}
