import java.awt.*;
import java.util.Random;
import javax.swing.*;

public class Main extends JPanel implements Runnable {
    private int x, y;
    private int dx, dy;

    private final int BALL_SIZE = 50;
    private final Random rand = new Random();

    public Main() {
        x  = rand.nextInt(400);
        y  = rand.nextInt(300);
        dx = rand.nextInt(11) - 5;
        dy = rand.nextInt(11) - 5;

        Thread t = new Thread(this);
        t.start();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.RED);
        g.fillOval(x, y, BALL_SIZE, BALL_SIZE);
    }

    @Override
    public void run() {
        while (true) {
            x += dx;
            y += dy;

            if (x < 0 || x > getWidth()  - BALL_SIZE) dx = -dx;
            if (y < 0 || y > getHeight() - BALL_SIZE) dy = -dy;

            repaint();

            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Random Moving Ball");
        Main ballPanel = new Main();
        frame.add(ballPanel);
        frame.setSize(500, 400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
