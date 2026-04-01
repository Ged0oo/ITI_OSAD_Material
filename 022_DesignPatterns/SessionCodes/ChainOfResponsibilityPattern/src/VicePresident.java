class VicePresident extends Approver {
    @Override
    public void approveRequest(int amount) {
        if (amount <= 50000) {
            System.out.println("✅ Vice President: Approved $" + amount);
        } else {
            if (nextApprover != null) {
                System.out.println("🔄 Vice President: Forwarding request to CEO...");
                nextApprover.approveRequest(amount);

            }
        }
    }
}