import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Test test = new Test();

        List<Rectangle> rectList = new ArrayList<>();
        rectList.add(new Rectangle());
        rectList.add(new Rectangle());

        List<Shape> shapesList = new ArrayList<>();
        shapesList.add(new Circle());
        shapesList.add(new Rectangle());
        shapesList.add(new Circle());

        System.out.println("Testing Rectangle List.");
        test.testingMethod(rectList);

        System.out.println("\nTesting Rectangle List.");
        test.testingMethod(shapesList);
    }
}
