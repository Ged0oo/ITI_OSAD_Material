package Liskov.RightLiskov;

abstract class AuthRequest {
}

class UsernamePasswordRequest extends AuthRequest {

    String username;
    String password;

    public UsernamePasswordRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
class OTPRequest extends AuthRequest {

    String phone;
    String otp;

    public OTPRequest(String phone, String otp) {
        this.phone = phone;
        this.otp = otp;
    }

}