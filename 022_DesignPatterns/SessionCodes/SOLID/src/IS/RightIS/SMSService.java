package IS.RightIS;

class SMSService implements SMSNotifier {

    public void sendSMS(String message) {
        System.out.println("Sending SMS: " + message);
    }

}