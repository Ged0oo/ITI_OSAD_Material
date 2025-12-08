public class Main {
    public static void main(String[] args){
        Complex<Integer> c1 = new Complex<>(2, 2);
        Complex<Double>  c2 = new Complex<>(5.0, 4.0);
        Complex<Float>   c3 = new Complex<>(2.0f, 1.0f);

        Complex<Double> r1 = c1.add(c2);
        r1.printComplex();

        Complex<Double> r2 = c1.add(c3);
        r2.printComplex();
        
        Complex<Double> r3 = c2.add(c3);
        r3.printComplex();
    }
}
