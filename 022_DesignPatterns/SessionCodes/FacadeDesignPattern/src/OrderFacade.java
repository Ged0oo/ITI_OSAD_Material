class OrderFacade {
    private InventoryService inventory;
    private PaymentService payment;
    private ShippingService shipping;
    private NotificationService notification;

    public OrderFacade() {
        this.inventory = new InventoryService();
        this.payment = new PaymentService();
        this.shipping = new ShippingService();
        this.notification = new NotificationService();
    }

    public void placeOrder(String productId, String customerAccount, double amount, String address, String email) {
        System.out.println("\n🛒 Processing order...\n");

        if (!inventory.checkStock(productId)) {
            System.out.println("❌ Order failed: Product is out of stock.");
            return;
        }

        if (!payment.processPayment(customerAccount, amount)) {
            System.out.println("❌ Order failed: Payment declined.");
            return;
        }

        shipping.arrangeShipping(productId, address);
        notification.sendConfirmation(email);

        System.out.println("\n✅ Order placed successfully!\n");
    }
}
