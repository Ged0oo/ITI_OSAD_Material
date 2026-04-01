package Liskov.WrongLiskov;

public class Main {
    public static void main(String[] args) {
        LoginController controller = new LoginController();
        AuthService OTPAuthService = new OTPAuthService();
        AuthRequests AuthRequests = new OtpAuthRequest("123456");
        AuthRequests data= new UsenrameRequest("Alaaa","sherif");
        controller.authenticateUser(new OTPAuthService(),AuthRequests);
        controller.authenticateUser(new GoogleAuthService(),data);
    }
}

