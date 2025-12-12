package main.controller;

import library.model.Client;
import library.model.LibraryItem;
import library.service.ClientManager;
import library.service.Library;
import library.exceptions.ItemNotFoundException;
import main.ui.Ui;
import main.validation.Validation;
import java.util.List;
import java.util.Scanner;

public class LibraryOperationsController extends BaseController {

    public LibraryOperationsController(Scanner sc, Library library, ClientManager clientManager, Ui ui, Validation valid) {
        super(sc, library, clientManager, ui, valid);
    }

    @Override
    public void runMenu() {
        int choice = 0;
        do {
            ui.printLibraryOperationsMenu();
            try {
                choice = Integer.parseInt(sc.nextLine());
                switch (choice) {
                    case 1: handleBorrowItem(); break;
                    case 2: handleReturnItem(); break;
                    case 3: displayAvailableCopies(); break;
                    case 4: displayClientBorrowedItems(); break;
                    case 5: displayAllBorrowedItems(); break;
                    case 6: break;
                    default: {ui.printInvalidChoice(); ui.pressEnterToContinue(sc);}
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
            }
        } while (choice != 6);
    }

    private void handleBorrowItem(){
        ui.printHeader("Client Borrow Item");

        String clientId = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );
        Client client = clientManager.getClient(clientId);
        if (client == null) {
            System.out.println("Client with ID " + clientId + " not found.");
            ui.pressEnterToContinue(sc);
            return;
        }
        System.out.println("Retrieved Client: " + client.getClientDetails());

        String itemId = valid.getInputWithValidation(sc, "Enter Item ID: "  , valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        try {
            library.borrowItem(clientId, itemId);
            System.out.println("SUCCESS: Item " + itemId + " borrowed by Client " + clientId + ".");
        } catch (ItemNotFoundException e) {
            System.out.println("Borrow Item Failed: " + e.getMessage());
        } finally {
            ui.pressEnterToContinue(sc);
        }
    }

    private void handleReturnItem(){
        ui.printHeader("Client Return Item");

        String clientId = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );
        Client client = clientManager.getClient(clientId);
        if (client == null) {
            System.out.println("Client with ID " + clientId + " not found.");
            ui.pressEnterToContinue(sc);
            return;
        }
        System.out.println("Retrieved Client: " + client.getClientDetails());

        String itemId = valid.getInputWithValidation(sc, "Enter Item ID: "  , valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        try {
            library.returnItem(clientId, itemId);
            System.out.println("SUCCESS: Item " + itemId + " returned by Client " + clientId + ".");
        } catch (ItemNotFoundException e) {
            System.out.println("Return Item Failed: " + e.getMessage());
        } finally {
            ui.pressEnterToContinue(sc);
        }
    }

    private void displayAvailableCopies() {
        ui.printHeader("Available Copies of All Items");

        library.items.entrySet().stream()
                .forEach(entry -> {
                    String itemId = entry.getKey();
                    LibraryItem item = entry.getValue();
                    int copies = library.countItemCopies.getOrDefault(itemId, 0);

                    System.out.println("Item ID: " + itemId);
                    System.out.println("Item Details: " + item.getItemDetails());
                    System.out.println("Available Copies: " + copies);
                    System.out.println("---------------------------");
                });

        ui.pressEnterToContinue(sc);
    }

    private void displayClientBorrowedItems(){
        ui.printHeader("Client Borrowed Items");

        String clientId = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );
        Client client = clientManager.getClient(clientId);
        if (client == null) {
            System.out.println("Client with ID " + clientId + " not found.");
            ui.pressEnterToContinue(sc);
            return;
        }

        System.out.println("Retrieved Client: " + client.getClientDetails());

        try {
            List<String> borrowedItems = library.getClientBorrowedItems(clientId);
            System.out.println("Items Borrowed: " + borrowedItems);
        } catch (ItemNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            ui.pressEnterToContinue(sc);
        }
    }

    private void displayAllBorrowedItems() {
        ui.printHeader("All Clients Borrowed Items");

        library.clientBorrowedItems.entrySet().stream()
                .forEach(entry -> {
                    String clientId = entry.getKey();
                    List<String> items = entry.getValue();
                    System.out.println("Client ID: " + clientId);
                    System.out.println("Borrowed Items: " + items);
                    System.out.println("-----------------------");
                });

        ui.pressEnterToContinue(sc);
    }
}