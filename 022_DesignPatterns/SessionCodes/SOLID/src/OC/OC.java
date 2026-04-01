package OC;

public class OC {
}
interface PaymentMethod {
    void pay();
}

class PaymentProcessorV2 {

    public void processPayment(PaymentMethod paymentMethod) {
        paymentMethod.pay();
    }

}

class CreditCardPayment implements PaymentMethod {

    public void pay() {
      throw new RuntimeException();
    }

}
class PayPalPayment implements PaymentMethod {

    public void pay() {
        System.out.println("Paying with PayPal");
    }
    public void refund(){
        System.out.println("the money is refund");
    }

}
class CashPayment implements PaymentMethod {

    public void pay() {
        System.out.println("Paying with Cash");
    }

}