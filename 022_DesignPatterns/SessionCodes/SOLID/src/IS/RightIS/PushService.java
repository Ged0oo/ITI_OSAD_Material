package IS.RightIS;

class PushService implements PushNotifier {

    public void sendPush(String message) {
        System.out.println("Sending Push Notification: " + message);
    }

}
