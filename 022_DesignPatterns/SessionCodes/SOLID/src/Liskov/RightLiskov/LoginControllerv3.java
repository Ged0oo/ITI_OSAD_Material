package Liskov.RightLiskov;

class LoginControllerv3 {

    public void authenticateUser(AuthServiceV2 authService) {
        // Call authenticate() on the passed AuthServiceV2
        boolean success = authService.authenticate();

        if (success) {
            System.out.println("User logged in successfully");
        } else {
            System.out.println("Authentication failed");
        }
    }

}
