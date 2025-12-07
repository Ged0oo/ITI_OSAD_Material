
import java.util.function.Function;


public class CentToFehr {
    public static void main(String[] args){
        Function<Double, Double> convert = (cent) -> cent * (9.0/5) + 32;
        System.out.print(convert.apply(5.0));
    } 
}