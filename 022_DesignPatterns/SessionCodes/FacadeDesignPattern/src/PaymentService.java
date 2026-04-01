// Subsystem 2: Payment Service
class PaymentService {
    public boolean processPayment(String account, double amount) {
        System.out.println("Processing payment of $" + amount + " from account: " + account);
        return true; // Assume payment is always successful
    }
}