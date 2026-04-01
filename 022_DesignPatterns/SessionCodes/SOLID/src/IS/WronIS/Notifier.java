package IS.WronIS;

public interface Notifier {
void sendEmail(String message);
void sendSMS(String message);
void sendPush(String message);
}