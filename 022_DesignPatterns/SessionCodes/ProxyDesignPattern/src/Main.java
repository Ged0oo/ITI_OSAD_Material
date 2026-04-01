public class Main {
    public static void main(String[] args) {
        // Using the proxy instead of calling RealPaymentService directly
        PaymentService paymentService = new LoggingPaymentProxy();

        // Process payments
        paymentService.processPayment("12345", 100.50);
        paymentService.processPayment("67890", 250.75);
    }
}