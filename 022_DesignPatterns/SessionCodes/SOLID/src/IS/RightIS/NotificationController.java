package IS.RightIS;

public class NotificationController {

    public void notifyUser(EmailNotifier email, SMSNotifier sms, PushNotifier push) {
        if (email != null) email.sendEmail("Hello via Email!");
        if (sms != null) sms.sendSMS("Hello via SMS!");
        if (push != null) push.sendPush("Hello via Push!");
    }

    public static void main(String[] args) {
        EmailNotifier emailService = new EmailService();
        SMSNotifier smsService = new SMSService();
        PushNotifier pushService = new PushService();

        NotificationController controller = new NotificationController();
        controller.notifyUser(emailService, smsService, pushService);
    }
}
/**
 *
 *
 * ey Lesson for Students
 *
 * “Split interfaces by capability. Classes implement only what they need.”
 *
 * In a real system, this prevents forcing code to implement methods it doesn’t use
 *
 * Makes your system flexible and maintainable
 */
