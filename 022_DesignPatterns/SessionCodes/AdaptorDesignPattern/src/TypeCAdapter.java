class  TypeCAdapter implements TypeCCharger {
    private LegacyCharger legacyCharger; // Using the legacy interface

    public TypeCAdapter(LegacyCharger legacyCharger) {
        this.legacyCharger = legacyCharger;
    }

    @Override
    public void chargeWithTypeC() {
        System.out.println("🔄 Converting Type-C request to Micro-USB...");
        legacyCharger.chargeWithMicroUSB();  // Uses the old charging method
    }
}