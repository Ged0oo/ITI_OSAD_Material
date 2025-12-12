package library.service;

import java.util.*;
import library.model.*;

public class ClientManager {
    public Map<String, Client> clients;

    public ClientManager(){this.clients = new HashMap<>();}

    public void addClient(Client client){
        clients.put(client.getId(), client);
    }

    public Client getClient(String id){
        return clients.get(id);
    }

    public void getAllClients(){
        System.out.println("\n ===== All Library Clients =====");
        if (clients.isEmpty()) {
            System.out.println("No clients registered.");
            return;
        }
        for (Client client : clients.values()) {
            System.out.println(client.getClientDetails());
        }
        System.out.println("\n ===== * =============== * =====");
    }

    public void updateClient(String id, Client newClient){
        Client client = clients.get(id);
        if (client != null) {
            client.setName(newClient.getName());
            client.setPhone(newClient.getPhone());
            client.setEmail(newClient.getEmail());
            System.out.println("Client with ID " + id + " updated successfully.");
        } else {
            System.out.println("Client with ID " + id + " not found for update.");
        }
    }

    public void deleteClient(String id) {
        if (clients.remove(id) != null) System.out.println("Client with ID " + id + " deleted successfully.");
        else System.out.println("Client with ID " + id + " not found for deletion.");
    }
}
