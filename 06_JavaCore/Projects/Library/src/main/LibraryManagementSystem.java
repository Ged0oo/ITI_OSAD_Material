package main;


import main.ui.*;
import java.util.*;
import library.model.*;
import main.validation.*;
import library.service.*;
import main.controller.*;
import library.exceptions.*;


public class LibraryManagementSystem {
    private final Scanner sc = new Scanner(System.in);
    private final Library library = new Library();
    private final ClientManager clientManager = new ClientManager();
    private final Ui ui = new Ui();

    private final ItemController itemController;
    private final ClientController clientController;
    private final LibraryOperationsController libraryOpsController;

    public LibraryManagementSystem() {
        Validation valid = new Validation();
        this.itemController = new ItemController(sc, library, clientManager, ui, valid);
        this.clientController = new ClientController(sc, library, clientManager, ui, valid);
        this.libraryOpsController = new LibraryOperationsController(sc, library, clientManager, ui, valid);
    }

    public static void main(String[] args) throws ItemNotFoundException {
        LibraryManagementSystem libSystem = new LibraryManagementSystem();
        libSystem.initializeData();
        libSystem.runMenu();
    }

    private void initializeData() throws ItemNotFoundException {
        Book book1 = new Book("200124", "Headway OOP Fundamentals", "Mohamed Nagy");
        Magazine magazine1 = new Magazine("200125", "", 45);
        Book book2 = new Book("200126", "Grokking Algorithms", "Tamer Hosny");

        library.addItem(book1, 5);
        library.addItem(magazine1, 3);
        library.addItem(book2, 5);

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
                    case 1: itemController.runMenu(); break;
                    case 2: clientController.runMenu(); break;
                    case 3: libraryOpsController.runMenu(); break;
                    case 4: System.out.println("Exiting System. Goodbye!"); break;
                    default: {ui.printInvalidChoice();}
                }
            } catch (NumberFormatException e){
                System.out.println("Invalid input. Please enter a number.");
                choice = 0;
            }

        } while (choice != 4);
    }
}