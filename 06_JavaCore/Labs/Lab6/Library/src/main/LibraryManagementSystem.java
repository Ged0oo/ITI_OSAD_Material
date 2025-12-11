package main;

import main.ui.*;
import main.validation.*;
import library.model.*;
import library.service.*;
import library.exceptions.ItemNotFoundException;
import java.util.*;

public class LibraryManagementSystem {
    private Scanner sc = new Scanner(System.in);
    private Library library = new Library();
    private ClientManager clientManager = new ClientManager();
    private Ui ui = new Ui();
    private Validation valid = new Validation();

    public static void main(String[] args) throws ItemNotFoundException {
        LibraryManagementSystem libSystem = new LibraryManagementSystem();
        libSystem.initializeData();
        libSystem.runMenu();
    }

    private void initializeData() throws ItemNotFoundException {
        Book book1 = new Book("200124", "Headway OOP Fundamentals", "Mohamed Nagy");
        Magazine magazine1 = new Magazine("200125", "", 45);
        Book book2 = new Book("200126", "Grokking Algorithms", "Tamer Hosny");

        library.addItem(book1);
        library.addItem(magazine1);
        library.addItem(book2);

        Client client1 = new Client("190190", "Mohamed Nagy", "01025054132", "nagy@gmail.com");
        Client client2 = new Client("180180", "Eric Traury", "01553158667", "cr7@madrid.com");

        clientManager.addClient(client1);
        clientManager.addClient(client2);
    }

    private void runMenu(){
        int choice = 0;
        do {
            ui.printMainScreen();
            try {
                choice = Integer.parseInt(sc.nextLine());
                switch (choice){
                    case 1: itemMenu(); break;
                    case 2: clientMenu(); break;
                    case 3: System.out.println("Exiting System. Goodbye!"); break;
                    default: {System.out.println("Invalid choice. Please try again."); ui.pressEnterToContinue(sc);}
                }
            } catch (NumberFormatException e){
                System.out.println("Invalid input. Please enter a number.");
                choice = 0;
            }

        } while (choice != 3);
    }

    private void itemMenu() {
        int choice;
        do {
            ui.printItemstMenu();
            try {
                choice = Integer.parseInt(sc.nextLine());
                switch (choice) {
                    case 1: addItem(Book.class); break;
                    case 2: addItem(Magazine.class); break;
                    case 3: retrieveItem(); break;
                    case 4: library.displayItems(); ui.pressEnterToContinue(sc); break;
                    case 5: updateItem(); break;
                    case 6: deleteItem(); break;
                    case 7: break;
                    default: {System.out.println("Invalid choice. Please try again."); ui.pressEnterToContinue(sc);}
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                choice = 0;
            }
        } while (choice != 7);
    }

    private <T extends LibraryItem> void  addItem(Class<T> itemType){
        ui.printHeader("Add New Item");

        System.out.print("Enter Item ID: ");
        String id = valid.getInputWithValidation(sc, "Enter Item ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);

        if(library.items.containsKey(id)){
            System.out.println("Item already Exist.");
            ui.pressEnterToContinue(sc);
            return;
        }

        System.out.print("Enter Title: ");
        String title = sc.nextLine();

        try {
            if (itemType == Book.class) {
                System.out.print("Enter Author: ");
                String author = valid.getInputWithValidation(sc, "Enter Name: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.", true);
                Book book = new Book(id, title, author);
                library.addItem(book);
                System.out.println("Book added successfully: " + book.getItemDetails());
            }
            else if (itemType == Magazine.class) {
                System.out.print("Enter Issue Number: ");
                int issueNumber = Integer.parseInt(sc.nextLine());
                Magazine magazine = new Magazine(id, title, issueNumber);
                library.addItem(magazine);
                System.out.println("Magazine added successfully: " + magazine.getItemDetails());
            }
        }
        catch (NumberFormatException | ItemNotFoundException e) {
            System.out.println("Invalid number format. Item not added.");
        }
        finally {
            ui.pressEnterToContinue(sc);
        }
    }

    private void retrieveItem(){
        ui.printHeader("Retrieve Item Information");

        System.out.print("Enter Item ID to retrieve: ");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);

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

    private void updateItem(){
        ui.printHeader("Update Item Information.");

        System.out.println("Enter Item ID to update: ");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);

        try {
            LibraryItem existingItem = library.getItem(id);
            System.out.println("Current Details: " + existingItem.getItemDetails());

            System.out.print("Enter new Title: ");
            String newTitle = sc.nextLine();
            LibraryItem updatedItem;

            if (existingItem instanceof Book) {
                System.out.print("Enter new Author: ");
                String newAuthor = valid.getInputWithValidation(sc, "Enter Name: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.", true);
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

            library.updateItem(id, updatedItem);
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

        System.out.println("Enter Item ID to update: ");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);
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

    private void clientMenu() {
        int choice;
        do {
            ui.printClientMenu();
            try {
                choice = Integer.parseInt(sc.nextLine());
                switch (choice) {
                    case 1: addClient(); break;
                    case 2: retrieveClient(); break;
                    case 3: clientManager.getAllClients(); break;
                    case 4: updateClient(); break;
                    case 5: deleteClient(); break;
                    case 6: break;
                    default: System.out.println("Invalid choice. Please try again.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                choice = 0;
            }
            finally {
                ui.pressEnterToContinue(sc);
            }
        } while (choice != 6);
    }

    private void addClient() {
        ui.printHeader("Add New Client");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);

        if(clientManager.clients.containsKey(id)){
            System.out.println("Client Exist.");
            return;
        }

        String name = valid.getInputWithValidation(sc, "Enter Name: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.", true);
        String phone = valid.getInputWithValidation(sc, "Enter Phone: ", valid.PHONE_PATTERN, "Invalid Phone Number. Must be exactly 11 numeric digits.", false);
        String email = valid.getInputWithValidation(sc, "Enter Email: ", valid.EMAIL_PATTERN, "Invalid Email format.", false);
        Client client = new Client(id, name, phone, email);
        clientManager.addClient(client);
        System.out.println("Client added successfully: " + client.getClientDetails());
    }

    private void retrieveClient() {
        ui.printHeader("Retrieve Client Information");

        System.out.print("Enter Client ID to retrieve: ");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);

        Client client = clientManager.getClient(id);

        if (client != null) System.out.println("Retrieved Client: " + client.getClientDetails());
        else System.out.println("Client with ID " + id + " not found.");
    }

    private void updateClient() {
        ui.printHeader("Update Client Information");

        System.out.print("Enter Client ID to update: ");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);

        Client client = clientManager.getClient(id);
        if (client != null) {
            System.out.println("Current Details: " + client.getClientDetails());

            String newName = valid.getInputWithValidation(sc, "Enter new Name: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.", true);
            String newPhone = valid.getInputWithValidation( sc, "Enter new Phone: ", valid.PHONE_PATTERN, "Invalid Phone Number. Must be exactly 11 numeric digits.", false);
            String newEmail = valid.getInputWithValidation(sc, "Enter new Email: ", valid.EMAIL_PATTERN, "Invalid Email format.", false);

            Client newClient = new Client(id, newName, newPhone, newEmail);
            clientManager.updateClient(id, newClient);
            System.out.println("Client updated successfully: " + newClient.getClientDetails());

        } else {
            System.out.println("Client with ID " + id + " not found for update.");
        }
    }

    private void deleteClient() {
        ui.printHeader("Delete Client");
        System.out.print("Enter Client ID to delete: ");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits.", false);
        clientManager.deleteClient(id);
    }
}