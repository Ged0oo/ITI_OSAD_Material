import quadratics.*;

public class Main { 
    public static void main(String[] args) {
        Parameters p = new Parameters(1, -3, 2);
        Roots r = QuadraticEquation.solve(p);
        System.out.println("Roots: " + r.root1() + ", " + r.root2());
    }
}
