// Decorator: Implements Pizza & wraps another Pizza object
class ToppingDecorator implements Pizza {
    protected Pizza pizza;

    public ToppingDecorator(Pizza pizza) {
        this.pizza = pizza;
    }


    public String getDescription() {
        return pizza.getDescription(); // Forward call to wrapped object
    }

    public double getCost() {
        return pizza.getCost(); // Forward call to wrapped object
    }
}