public class CEO extends Approver{

    public void approveRequest(int amount) {
        System.out.println("CEO: Approved $" + amount);
    }

}