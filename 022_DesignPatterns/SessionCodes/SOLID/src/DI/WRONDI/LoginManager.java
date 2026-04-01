package DI.WRONDI;

public class LoginManager {
    private DatabaseAuthService authService;

    public LoginManager() {
        authService = new DatabaseAuthService();
    }

    public void login(String username, String password) {
        if (authService.authenticate(username, password)) {
            System.out.println("Login success");
        } else {
            System.out.println("Login failed");
        }
    }
}
