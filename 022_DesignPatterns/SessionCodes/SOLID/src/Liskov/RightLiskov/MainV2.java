package Liskov.RightLiskov;

public class MainV2 {
    public static void main(String[] args) {
        LoginControllerv3 controller = new LoginControllerv3();

        // 1️⃣ Username/Password login
        AuthServiceV2 basicAuth = new BasicAuthServiceV2();

        controller.authenticateUser(basicAuth);

        // 2️⃣ OTP login
        AuthServiceV2 otpAuth = new OTPAuthServiceV2();

        controller.authenticateUser(otpAuth);
    }
}
