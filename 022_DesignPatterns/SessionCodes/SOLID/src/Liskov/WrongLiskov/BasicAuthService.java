package Liskov.WrongLiskov;

class BasicAuthService extends AuthService {

    @Override
    public boolean login(UsenrameRequest UsenrameRequest) {
        System.out.println("Login using username and password");
        return true;
    }

}