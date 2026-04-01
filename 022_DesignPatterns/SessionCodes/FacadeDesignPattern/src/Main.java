public class Main {
    public static void main(String[] args) {
        // Create Facade
        OrderFacade orderFacade = new OrderFacade();

        // Place an order using a simple method
        orderFacade.placeOrder("P123", "cust123", 99.99, "123 Main St", "customer@email.com");
    }
}
//🎯 Scenario:
//In an e-commerce platform, when a customer places an order, multiple subsystems are involved:

//Inventory Service → Checks if the product is in stock.
//Payment Service → Processes the payment.
//Shipping Service → Arranges delivery.
//Notification Service → Sends an email confirmation.
//Instead of calling each subsystem separately, we create an OrderFacade that simplifies everything into a single method placeOrder().

