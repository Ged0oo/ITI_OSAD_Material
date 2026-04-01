package OC;

class PaymentProcessor {
    public void pay(String paymentType) {
        //
    }
}
/**
 * -----> tightly coupled for compile,    loossly coupled for compile ----> dynamic runtime
Bad design:  "Every time we add a feature, we edit old code." break op
Good design: "Every time we add a feature, we create a new class." ahivie op
 **/
/**
 interface Payment{
  public void pay(String paymentType);
 }
 class paymop implments Payment {
    public void pay(String paymentType){
     sout("pay with paymop)
      }
 }
 class midtasset implments Payment {
 public void pay(String paymentType){
 sout("pay with midtasset)
 }
 }
 class controller PaymentProcessorService.pay()
 class PaymentProcessorService implments Payment{

      public void pay(Payment payment) {
      //Payment:class, class extends
      //Payment:interfacce ,implements this class
         payment.pay();

      }
 }








 */
