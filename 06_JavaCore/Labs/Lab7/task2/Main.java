import javax.swing.JFrame;
import javax.swing.JLabel;

public class Main extends JFrame implements Runnable {
    Thread th;
    JLabel timeLabel = new JLabel();

    public Main() {
        this.setTitle("Banner Application");
        this.setLayout(null);
        this.add(timeLabel);
        th = new Thread(this);
        th.start();
    }

    public void run() {
        String message = "Hello World";
        int x = 0;
        int dx = 10;

        while (true) {
            x += dx;

            if (x >= 550 || x <= 0) dx = -dx;

            timeLabel.setBounds(x, 100, 200, 50);
            timeLabel.setText(message);

            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        Main app = new Main();
        app.setBounds(50, 50, 600, 400);
        app.setVisible(true);
        app.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
