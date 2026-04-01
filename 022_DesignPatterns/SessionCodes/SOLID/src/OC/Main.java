package OC;

public class Main {
    public static void main(String[] args) {

      PaymentProcessorV2 processor = new PaymentProcessorV2();
      //interface(parent)          child       --------> upcasting -->generaltion -->polymorphim    save

       // refernce type -------------------------------> object type
        PaymentMethod payment = new CreditCardPayment(); //
        // child ---instead of parent it break the system

        processor.processPayment(payment);

    }
}
/*
       polymorphim ovverirde----->dyanmic loosly coupled compile time
      refernce type -------------------------------> object type
                              vs
      methods that                                   which implemention will run in run time
      are eligable to run
      compile





      PaymentProcessorV2 processor = new PaymentProcessorV2();
      //interface(parent)          child       --------> upcasting -->generaltion -->polymorphim    save
      PaymentMethod payment = new PayPalPayment();

      payment.refund();---------------------------> compile error
      processor.processPayment(payment);

* */











