package library.service;

import library.exceptions.*;
import library.model.*;
import java.util.*;

public class Library {
    public HashMap<String, LibraryItem> items;

    public Library(){ this.items = new HashMap<>(); }

    public void addItem(LibraryItem item) throws ItemNotFoundException {
        if(items.containsKey(item.getId())) {
            throw new ItemNotFoundException("Item with ID " + item.getId() + " already existed.");
        }
        items.put(item.getId(), item);
    }

    public <T extends LibraryItem> T getItem(String id) throws ItemNotFoundException{
        if(items.containsKey(id)) return (T) items.get(id);
        throw new ItemNotFoundException("Item with ID " + id + " not found.");
    }

    public void displayItems(){
        System.out.println("\n ============== All Library Items ==============");
        if(items.isEmpty()){
            System.out.println("No Items Listed.");
            return;
        }
        for(LibraryItem item : items.values()) System.out.println(item.getItemDetails());
        System.out.println("\n ============== * ============== * ==============");
    }

    public void updateItem(String id, LibraryItem newItem) {
        LibraryItem oldItem = items.get(id);
        oldItem.setTitle(newItem.getTitle());

        if(oldItem instanceof Book && newItem instanceof Book){
            ((Book)oldItem).setAuthor(((Book)newItem).getAuthor());
        } else if(oldItem instanceof Magazine && newItem instanceof Magazine){
            ((Magazine)oldItem).setIssueNumber(((Magazine)newItem).getIssueNumber());
        }
        else return;
    }

    public void deleteItem(String id) throws ItemNotFoundException{
        if(items.containsKey(id)) items.remove(id);
        else throw new ItemNotFoundException("Item with ID " + id + " not found for deletion.");
    }

    public void handleItems(List<LibraryItem> list){
        System.out.println("\n ===== Handle Library Items =====");
        for(LibraryItem item : items.values()) System.out.println(item.getItemDetails());
        System.out.println("\n ===== * ================ * =====");
    }
}
