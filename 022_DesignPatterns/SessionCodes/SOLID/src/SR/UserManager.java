package SR;
class UserManager {
    //userRepo
    // service
    public void createUser() {
      //  userRepo.saveUserToDatabase()
        System.out.println("Creating user");
    }
    //repository userRepo
    public void saveUserToDatabase() {
        System.out.println("Saving to database");
    }

    public void sendEmail() {
        System.out.println("Sending email");
    }

    public void generateReport() {
        System.out.println("Generating report");
    }
}
//PROBLEM
/*
1-Changes break other things
2-Hard to reuse
A class can have many methods, but they must serve ONE responsibility.
Controller ----------> customer {  api / rest get post delete put patch ------> service()------>pattern (??)
service
repository
utils
models
view
* */
