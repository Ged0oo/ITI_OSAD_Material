package library.service;

import library.exceptions.*;
import library.model.*;
import java.util.*;

public class Library {
    public List<LibraryItem> items;

    public Library(){ this.items = new ArrayList<>(); }

    public void addItem(LibraryItem item){items.add(item);}

    public <T extends LibraryItem> T getItem(String id) throws ItemNotFoundException{
        for(LibraryItem item : items){
            if(item.getId().equals(id)){
                return (T) item;
            }
        }
        throw new ItemNotFoundException("Item with ID " + id + " not found.");
    }

    public void displayItems(){
        System.out.println("\n ============== All Library Items ==============");
        if(items.isEmpty()){
            System.out.println("No Items Listed.");
            return;
        }
        for(LibraryItem item : items) System.out.println(item.getItemDetails());
        System.out.println("\n ============== * ============== * ==============");
    }

    public void updateItem(String id, LibraryItem newItem) throws ItemNotFoundException{
        for(int i=0 ; i<items.size() ; i++){
            LibraryItem oldItem = items.get(i);
            oldItem.setTitle(newItem.getTitle());

            if(oldItem instanceof Book && newItem instanceof Book){
                ((Book)oldItem).setAuthor(((Book)newItem).getAuthor());
            }

            if(oldItem instanceof Magazine && newItem instanceof Magazine){
                ((Magazine)oldItem).setIssueNumber(((Magazine)newItem).getIssueNumber());
            }
            return;
        }
        throw new ItemNotFoundException("Item with ID " + id + " not found for update.");
    }

    public void deleteItem(String id) throws ItemNotFoundException{
        Iterator<LibraryItem> itr = items.iterator();
        while (itr.hasNext()){
            LibraryItem item = itr.next();
            if(item.getId().equals(id)){
                itr.remove();
                return;
            }
        }
        throw new ItemNotFoundException("Item with ID " + id + " not found for deletion.");
    }

    public void handleItems(List<LibraryItem> list){
        System.out.println("\n ===== Handle Library Items =====");
        for(LibraryItem item : items) System.out.println(item.getItemDetails());
        System.out.println("\n ===== * ================ * =====");
    }
}
