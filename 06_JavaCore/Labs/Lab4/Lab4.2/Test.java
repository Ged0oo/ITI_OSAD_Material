import java.util.*;

public class Test {

    void testingMethod(List<? extends Shape> shapes){
        System.out.println("Drawing All Shapes.");
        for(Shape shape:shapes){shape.draw();}
    }
    
}
