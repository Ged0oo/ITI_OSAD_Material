package Liskov.WrongLiskov;

class OTPAuthService extends AuthService {

    @Override
    public boolean login(UsenrameRequest UsenrameRequest) {
        throw new UnsupportedOperationException("Use OTP instead");
    }


}
