package Liskov.RightLiskov;

class OTPAuthServiceV2 implements AuthServiceV2 {

    @Override
    public boolean authenticate() {
        return true;
    }
}
