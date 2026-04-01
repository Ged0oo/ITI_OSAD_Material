package Liskov.WrongLiskov;

class LoginController {
    AuthService authService;

    public void authenticateUser(AuthService authService,AuthRequests  authRequests) {

        boolean result = authService.login(authRequests);
        if (result) {
            System.out.println("User logged in");
        }

    }

}