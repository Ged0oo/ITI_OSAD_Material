package IS.RightIS;

class EmailService implements EmailNotifier {

    public void sendEmail(String message) {
        System.out.println("Sending Email: " + message);
    }

}