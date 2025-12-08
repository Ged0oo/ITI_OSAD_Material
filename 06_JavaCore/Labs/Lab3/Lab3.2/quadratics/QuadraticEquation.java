package quadratics;

public class QuadraticEquation {

    public static Roots solve(Parameters p) {
        double a = p.a();
        double b = p.b();
        double c = p.c();

        double disc = (b * b) - (4 * a * c);

        if (disc > 0) {
            double sqrt = Math.sqrt(disc);
            return new Roots(
                (-b + sqrt) / (2 * a),
                (-b - sqrt) / (2 * a)
            );
        } 
        else if (disc == 0) {
            double x = -b / (2 * a);
            return new Roots(x, x);
        } 
        else {
            return new Roots(Double.NaN, Double.NaN);
        }
    }
}
