package main.controller;

import library.model.Book;
import library.model.LibraryItem;
import library.model.Magazine;
import library.service.ClientManager;
import library.service.Library;
import library.exceptions.ItemNotFoundException;
import main.ui.Ui;
import main.validation.Validation;
import java.util.Scanner;

public class ItemController extends BaseController {

    public ItemController(Scanner sc, Library library, ClientManager clientManager, Ui ui, Validation valid) {
        super(sc, library, clientManager, ui, valid);
    }

    @Override
    public void runMenu() {
        int choice = 0;
        do {
            ui.printItemstMenu();
            try {
                choice = Integer.parseInt(sc.nextLine());
                switch (choice) {
                    case 1: addItem(new Book()); break;
                    case 2: addItem(new Magazine()); break;
                    case 3: retrieveItem(); break;
                    case 4: library.displayItems(); ui.pressEnterToContinue(sc); break;
                    case 5: updateItem(); break;
                    case 6: deleteItem(); break;
                    case 7: break;
                    default: {ui.printInvalidChoice(); ui.pressEnterToContinue(sc);}
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
            } catch (ItemNotFoundException e) {
                System.out.println("Error: " + e.getMessage());
            }
        } while (choice != 7);
    }

    private void  addItem(LibraryItem itemType){
        ui.printHeader("Add New Item");
        String id = valid.getInputWithValidation(sc, "Enter Item ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        if(library.items.containsKey(id)){
            System.out.println("Item already Exist.");
            ui.pressEnterToContinue(sc);
            return;
        }

        int count = valid.getIntWithValidation(sc, "Enter Available Item Count: ", "Count must be Numeric Value (1-9)", 1, 9);
        System.out.print("Enter Title: ");
        String title = sc.nextLine();

        try {
            if (itemType instanceof Book) {
                String author = valid.getInputWithValidation(sc, "Enter Author: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.");
                Book book = new Book(id, title, author);
                library.addItem(book, count);
                System.out.println("Book added successfully: " + book.getItemDetails());
            }
            else if (itemType instanceof Magazine) {
                System.out.print("Enter Issue Number: ");
                int issueNumber = Integer.parseInt(sc.nextLine());
                Magazine magazine = new Magazine(id, title, issueNumber);
                library.addItem(magazine, count);
                System.out.println("Magazine added successfully: " + magazine.getItemDetails());
            }
        }
        catch (NumberFormatException | ItemNotFoundException e) {
            System.out.println("Invalid number format or item already exists. Item not added.");
        }
        finally {
            ui.pressEnterToContinue(sc);
        }
    }

    private void retrieveItem(){
        ui.printHeader("Retrieve Item Information");

        String id = valid.getInputWithValidation(sc, "Enter Item ID to retrieve: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        try{
            LibraryItem item = library.getItem(id);
            System.out.println("Retrieved Item: " + item.getItemDetails());
        } catch (ItemNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
        finally {
            ui.pressEnterToContinue(sc);
        }
    }

    private void updateItem() throws ItemNotFoundException {
        ui.printHeader("Update Item Information.");

        String id = valid.getInputWithValidation(sc, "Enter Item ID to update: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        try {
            if(library.items.containsKey(id) == false) throw new ItemNotFoundException("Can't Find this id");

            int count = valid.getIntWithValidation(sc, "Enter Available Item Count", "Count must be Numeric Value (1-9)", 1, 9);

            LibraryItem existingItem = library.getItem(id);
            System.out.println("Current Details: " + existingItem.getItemDetails());

            System.out.print("Enter new Title: ");
            String newTitle = sc.nextLine();
            LibraryItem updatedItem;

            if (existingItem instanceof Book) {
                String newAuthor = valid.getInputWithValidation(sc, "Enter new Author Name: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.");
                updatedItem = new Book(id, newTitle, newAuthor);
            }
            else if (existingItem instanceof Magazine) {
                System.out.print("Enter new Issue Number: ");
                int newIssueNumber = Integer.parseInt(sc.nextLine());
                updatedItem = new Magazine(id, newTitle, newIssueNumber);
            }
            else {
                return;
            }

            library.updateItem(id, updatedItem, count);
            System.out.println("Item updated successfully.");
            System.out.println("New Details: " + library.getItem(id).getItemDetails());

        } catch (ItemNotFoundException e){
            System.out.println("Error: " + e.getMessage());
        }
        finally {
            ui.pressEnterToContinue(sc);
        }
    }

    private void deleteItem(){
        ui.printHeader("Delete Item");

        String id = valid.getInputWithValidation(sc, "Enter Item ID to delete: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        try {
            library.deleteItem(id);
            System.out.println("Item with ID " + id + " deleted successfully.");
        }
        catch (ItemNotFoundException e){
            System.out.println("Error: " + e.getMessage());
        }
        finally {
            ui.pressEnterToContinue(sc);
        }
    }
}