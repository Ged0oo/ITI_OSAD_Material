public class Main {
    public static void main(String[] args) {
        // Order a plain pizza
        Pizza pizza = new PlainPizza();
       // System.out.println(pizza.getDescription() + " - $" + pizza.getCost());

        // Add cheese topping
       // pizza = new CheeseTopping(pizza);
        //System.out.println(pizza.getDescription() + " - $" + pizza.getCost());

        // Add pepperoni topping
       // pizza = new PepperoniTopping(pizza);
        //System.out.println(pizza.getDescription() + " - $" + pizza.getCost());

        // Add mushroom topping
        pizza = new CheeseTopping(new PepperoniTopping((new MushroomTopping(pizza))));
        //System.out.println(pizza.getDescription() + " - $" + pizza.getCost());
        //
    }
}