package library.service;

import library.exceptions.*;
import library.model.*;
import java.util.*;

public class Library {
    public HashMap<String, LibraryItem> items;
    public HashMap<String, Integer> countItemCopies;
    public HashMap<String, List<String>> clientBorrowedItems;

    public Library(){
        this.items = new HashMap<>();
        this.countItemCopies = new HashMap<>();
        this.clientBorrowedItems = new HashMap<>();
    }

    public void addItem(LibraryItem item, int count) throws ItemNotFoundException {
        if(items.containsKey(item.getId())) {
            throw new ItemNotFoundException("Item with ID " + item.getId() + " already existed.");
        }
        items.put(item.getId(), item);
        countItemCopies.put(item.getId(), count);
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

    public void updateItem(String id, LibraryItem newItem, int count) throws ItemNotFoundException{
        LibraryItem oldItem = items.get(id);
        oldItem.setTitle(newItem.getTitle());
        countItemCopies.put(id, count);

        if(oldItem instanceof Book && newItem instanceof Book){
            ((Book)oldItem).setAuthor(((Book)newItem).getAuthor());
        } else if(oldItem instanceof Magazine && newItem instanceof Magazine){
            ((Magazine)oldItem).setIssueNumber(((Magazine)newItem).getIssueNumber());
        }
    }

    public void deleteItem(String itemId) throws ItemNotFoundException{
        if(items.containsKey(itemId)) {
            items.remove(itemId);
            countItemCopies.remove(itemId);
        }
        else throw new ItemNotFoundException("Item with ID " + itemId + " not found for deletion.");
    }

    public void handleItems(List<LibraryItem> list){
        System.out.println("\n ===== Handle Library Items =====");
        for(LibraryItem item : items.values()) System.out.println(item.getItemDetails());
        System.out.println("\n ===== * ================ * =====");
    }

    public void borrowItem(String clientId, String itemId) throws ItemNotFoundException {
        getItemOrThrow(itemId);

        Integer copies = countItemCopies.get(itemId);
        if(copies == null || copies == 0) throw new ItemNotFoundException("Item with ID " + itemId + " has no copies available.");
        countItemCopies.put(itemId, copies-1);

        List<String> borrowed = clientBorrowedItems.getOrDefault(clientId, new ArrayList<>());
        borrowed.add(itemId);
        clientBorrowedItems.put(clientId, borrowed);
    }

    public void returnItem(String clientId, String itemId) throws ItemNotFoundException {
        getItemOrThrow(itemId);

        List<String> borrowed = clientBorrowedItems.get(clientId);
        if(borrowed == null || borrowed.contains(itemId) == false) throw new ItemNotFoundException("Client with ID " + clientId + " doesn't borrow this Item.");

        borrowed.remove(itemId);
        countItemCopies.put(itemId, countItemCopies.getOrDefault(itemId, 0) + 1);
        clientBorrowedItems.put(clientId, borrowed);
    }

    public boolean isClientBorrowItem(String clientId, String itemId) throws ItemNotFoundException{
        getItemOrThrow(itemId);

        List<String> borrowed = clientBorrowedItems.get(clientId);
        if(borrowed == null) throw new ItemNotFoundException("Client with ID " + clientId + " doesn't borrow any Item.");

        return borrowed.contains(itemId);
    }

    public List<String> getClientBorrowedItems(String clientId) throws ItemNotFoundException{
        List<String> borrowed = clientBorrowedItems.get(clientId);
        if(borrowed == null) throw new ItemNotFoundException("Client with ID " + clientId + " doesn't borrow any Item.");
        return borrowed;
    }

    private LibraryItem getItemOrThrow(String itemId) throws ItemNotFoundException{
        LibraryItem item = items.get(itemId);
        if(item == null) throw new ItemNotFoundException("Item with ID " + itemId + " doesn't exist.");
        return item;
    }
}
