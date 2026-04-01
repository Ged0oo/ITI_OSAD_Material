package DI.WRONDI;

public class DatabaseAuthService {
    public boolean authenticate(String username, String password) {
        System.out.println("Authenticating using database");
        return true;
    }
}
