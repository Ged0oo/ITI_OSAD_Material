package school.ui;

import java.util.Scanner;

public class ScreenHandler {

    public static void clearScreen() {
        for (int i = 0; i < 50; i++) System.out.println();
    }

    public static void printMenu() {
        clearScreen();
        System.out.println("\n===========================================");
        System.out.println("======= STUDENT REGISTRATION SYSTEM =======");
        System.out.println("1. List Available Courses");
        System.out.println("2. List Registered Students");
        System.out.println("3. Add New Course");
        System.out.println("4. Add New Student");
        System.out.println("5. Register Course for a Student");
        System.out.println("6. Print Final Reports");
        System.out.println("7. Print Student Final Report");
        System.out.println("0. Exit");
        System.out.print("Enter your choice: ");
    }

    public static void printHeader(String title) {
        clearScreen();
        System.out.println("\n-------- " + title + " --------");
    }

    public static void pressEnterToContinue(Scanner sc) {
        System.out.println("\nPress ENTER to return to Main Menu...");
        sc.nextLine();
    }
    
    public static void printSeparator() {
        System.out.println("-------------------------------");
    }
}
