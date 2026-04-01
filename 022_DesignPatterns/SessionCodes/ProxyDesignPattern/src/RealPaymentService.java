class RealPaymentService implements PaymentService {
    @Override
    public void processPayment(String account, double amount) {
        System.out.println("✅ Payment of $" + amount + " processed for account: " + account);
    }
}