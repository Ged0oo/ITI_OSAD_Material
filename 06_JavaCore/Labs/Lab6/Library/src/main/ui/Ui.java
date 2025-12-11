package main.ui;

import java.util.Scanner;

public class Ui {
    public static void clearScreen() {
        for (int i = 0; i < 50; i++) System.out.println();
    }

    public void printMainScreen(){
        clearScreen();
        System.out.println("\n======== Library Management System Menu ========");
        System.out.println("1. Item Operations");
        System.out.println("2. Client Operations");
        System.out.println("3. Exit");
        System.out.print("Enter choice: ");
    }

    public void printItemstMenu(){
        clearScreen();
        System.out.println("======== Item Operations Menu ========");
        System.out.println("1. Add Book");
        System.out.println("2. Add Magazine");
        System.out.println("3. Retrieve Item Details");
        System.out.println("4. Display All Items");
        System.out.println("5. Update Item");
        System.out.println("6. Delete Item");
        System.out.println("7. Back to Main Menu");
        System.out.print("Enter choice: ");
    }

    public void printClientMenu(){
        clearScreen();
        System.out.println("\n======== Client Operations Menu ========");
        System.out.println("1. Add Client");
        System.out.println("2. Retrieve Client Details");
        System.out.println("3. Display All Clients");
        System.out.println("4. Update Client");
        System.out.println("5. Delete Client");
        System.out.println("6. Back to Main Menu");
        System.out.print("Enter choice: ");
    }

    public void printHeader(String title) {
        clearScreen();
        System.out.println("\n-------- " + title + " --------");
    }

    public void pressEnterToContinue(Scanner sc) {
        System.out.println("\nPress ENTER to return to Main Menu...");
        sc.nextLine();
    }

    public void printSeparator() {
        System.out.println("-------------------------------");
    }
}
