import java.time.LocalDateTime;

// Proxy Class: Adds logging before processing payment
class LoggingPaymentProxy implements PaymentService {
    private RealPaymentService realPaymentService;

    public LoggingPaymentProxy() {
        this.realPaymentService = new RealPaymentService(); // Initialize the real object
    }

    @Override
    public void processPayment(String account, double amount) {
        // Logging logic before delegating the call
        System.out.println("📌 [LOG] " + LocalDateTime.now() + " - Processing payment of $" + amount + " for account: " + account);

        // Call the real payment service
        realPaymentService.processPayment(account, amount);

        // Log after processing
        System.out.println("✅ [LOG] Payment successfully processed.\n");
    }
}