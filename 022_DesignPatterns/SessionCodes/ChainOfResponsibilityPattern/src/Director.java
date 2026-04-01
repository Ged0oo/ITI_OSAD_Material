class Director extends Approver {

    public void approveRequest(int amount) {
        if (amount <= 10000) {
            System.out.println("Director: Approved $" + amount);
        } else if (nextApprover != null) {
            nextApprover.approveRequest(amount);
        }
    }
}