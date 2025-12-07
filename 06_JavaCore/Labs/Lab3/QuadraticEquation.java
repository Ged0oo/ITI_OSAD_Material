import java.util.function.Function;

class Roots {
    public double x1;
    public double x2;
    Roots(double x1, double x2) {
        this.x1 = x1;
        this.x2 = x2;
    }
}

class Parameters {
    public double a;
    public double b;
    public double c;
    public Parameters(double a, double b, double c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

public class QuadraticEquation {
    public static void main(String[] args) {
        Parameters par1 = new Parameters(1, -5, 6);

        Function<Parameters, Roots> eqn = (param) -> {
            double test = (param.b * param.b) - (4 * param.a * param.c);

            if (test > 0) {
                double sqrtD = Math.sqrt(test);
                double x1 = (-param.b + sqrtD) / (2 * param.a);
                double x2 = (-param.b - sqrtD) / (2 * param.a);
                return new Roots(x1, x2);
            } 
            else if (test == 0) {
                double x = -param.b / (2 * param.a);
                return new Roots(x, x);
            } 
            else {
                return new Roots(Double.NaN, Double.NaN);
            }
        };

        Roots roots = eqn.apply(par1);
        System.out.println("x1 = " + roots.x1 + ", x2 = " + roots.x2);
    }
}
