package Liskov.WrongLiskov;

class GoogleAuthService extends AuthService {

    public boolean login(AuthRequests authRequest) {
        System.out.println("Login using Google account");
        return true;
    }
}