public class Main {
    public static void main(String[] args) {
       //Scenario:
        //The new phone charger expects Type-C charging, but the old socket only supports Micro-USB.
        //The Adapter converts a Micro-USB socket into a Type-C charger.
        // Existing old charger
        LegacyCharger oldCharger = new MicroUSBCharger();

        // Using adapter to make it work with Type-C
        TypeCCharger adapter = new TypeCAdapter(oldCharger);

        // Now we can charge using Type-C
        adapter.chargeWithTypeC();
    }
}