package Liskov.WrongLiskov;

public class OtpAuthRequest extends AuthRequests {
    String otp;
    public OtpAuthRequest( String otp){
        this.otp=otp;

    }

}

