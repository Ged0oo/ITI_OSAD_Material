public class ApprovalHandler {
    public void processRequest(int amount) {
        if (amount <= 10000) {
            System.out.println("Director: Approved $" + amount);
        } else if (amount <= 50000) {
            System.out.println("Vice President: Approved $" + amount);
        } else {
            System.out.println("CEO: Approved $" + amount);
        }
    }
}
