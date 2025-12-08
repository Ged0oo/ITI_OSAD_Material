public class Complex<T extends Number>{
    private T real;
    private T imag;

    public Complex(T real, T imag) {
        this.real=real; 
        this.imag=imag;
    }

    public T getReal(){return real;}
    public T getImag(){return imag;}

    public Complex<Double> add(Complex<? extends Number> c){
        double r = this.real.doubleValue() + c.real.doubleValue();
        double i = this.imag.doubleValue() + c.imag.doubleValue();
        return new Complex<>(r, i);
    }

    public Complex<Double> sub(Complex<? extends Number> c){
        double r = this.real.doubleValue() - c.real.doubleValue();
        double i = this.imag.doubleValue() - c.imag.doubleValue();
        return new Complex<>(r, i);
    }

    public void printComplex(){
        System.out.println("Real: " + this.real + " Imag: " + this.imag);
    }
}