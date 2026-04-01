package IS.WronIS;

class SMSService implements Notifier {

    public void sendEmail(String message) {
        throw new UnsupportedOperationException();
    }

    public void sendSMS(String message) {
        System.out.println("Sending SMS: " + message);
    }

    public void sendPush(String message) {
        throw new UnsupportedOperationException();
    }

}