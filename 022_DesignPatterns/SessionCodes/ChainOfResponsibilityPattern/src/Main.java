public class Main {
    public static void main(String[] args) {
        //A company has an approval request where employees request budget approvals.
              //A Director can approve requests up to $10,000.
             //A Vice President can approve requests up to $50,000.
             //The CEO approves any requests.

//        ApprovalHandler handler = new ApprovalHandler();
//
//        // Process requests
//        handler.processRequest(5000);    // Director approves
//        handler.processRequest(20000);   // VP approves
//        handler.processRequest(100000);  // CEO approves

////////////////////////////////////////////////

        Approver director = new Director();
        Approver vp = new VicePresident();
        Approver ceo = new CEO();

        // Set up the chain: Director → VP ->CEO FLEXIBLITL
        director.setNextApprover(vp);
        vp.setNextApprover(ceo);

        // Process requests
        director.approveRequest(5000);    // Director approves
        director.approveRequest(20000);   // VP approves
        director.approveRequest(100000);  // CEO approves

    }
}





