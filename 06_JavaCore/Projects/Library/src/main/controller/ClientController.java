package main.controller;

import library.model.Client;
import library.service.ClientManager;
import library.service.Library;
import main.ui.Ui;
import main.validation.Validation;
import java.util.Scanner;

public class ClientController extends BaseController {

    public ClientController(Scanner sc, Library library, ClientManager clientManager, Ui ui, Validation valid) {
        super(sc, library, clientManager, ui, valid);
    }

    @Override
    public void runMenu() {
        int choice = 0;
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
                    default: ui.printInvalidChoice();
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                choice = 0;
            }
            finally {
                if(choice != 6) ui.pressEnterToContinue(sc);
            }
        } while (choice != 6);
    }

    private void addClient() {
        ui.printHeader("Add New Client");
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        if(clientManager.clients.containsKey(id)){
            System.out.println("Client Exist.");
            return;
        }

        String name = valid.getInputWithValidation(sc, "Enter Name: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.");
        String phone = valid.getInputWithValidation(sc, "Enter Phone: ", valid.PHONE_PATTERN, "Invalid Phone Number. Must be exactly 11 numeric digits." );
        String email = valid.getInputWithValidation(sc, "Enter Email: ", valid.EMAIL_PATTERN, "Invalid Email format." );
        Client client = new Client(id, name, phone, email);
        clientManager.addClient(client);
        System.out.println("Client added successfully: " + client.getClientDetails());
    }

    private void retrieveClient() {
        ui.printHeader("Retrieve Client Information");

        String id = valid.getInputWithValidation(sc, "Enter Client ID to retrieve:: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        Client client = clientManager.getClient(id);

        if (client != null) System.out.println("Retrieved Client: " + client.getClientDetails());
        else System.out.println("Client with ID " + id + " not found.");
    }

    private void updateClient() {
        ui.printHeader("Update Client Information");

        String id = valid.getInputWithValidation(sc, "Enter Client ID to update: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );

        Client client = clientManager.getClient(id);
        if (client != null) {
            System.out.println("Current Details: " + client.getClientDetails());

            String newName = valid.getInputWithValidation(sc, "Enter new Name: ", valid.NAME_PATTERN, "Invalid Name. Must contain only alphabets and spaces.");
            String newPhone = valid.getInputWithValidation( sc, "Enter new Phone: ", valid.PHONE_PATTERN, "Invalid Phone Number. Must be exactly 11 numeric digits." );
            String newEmail = valid.getInputWithValidation(sc, "Enter new Email: ", valid.EMAIL_PATTERN, "Invalid Email format." );

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
        String id = valid.getInputWithValidation(sc, "Enter Client ID: ", valid.ID_PATTERN, "Invalid ID. Must be exactly 6 numeric digits." );
        clientManager.deleteClient(id);
    }
}