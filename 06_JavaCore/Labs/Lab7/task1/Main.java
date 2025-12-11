import java.awt.*;
import java.util.*;
import javax.swing.JFrame;
import javax.swing.JLabel;


public class Main extends JFrame implements Runnable
{
    Thread th; 
    Date d = new Date();
    JLabel timeLabel = new JLabel();
    public Main()
    {
        this.setTitle("Date & Time Frame Application");
        timeLabel.setHorizontalAlignment(JLabel.CENTER);
        timeLabel.setText(d.toString());
        this.add(timeLabel,BorderLayout.CENTER);
        th = new Thread(this);
        th.start();
    }

    public void run()
    {
        while(true)
        {
            d= new Date();
            timeLabel.setText(d.toString());
            try 
            {
                Thread.sleep(1000);
            } 
            catch (InterruptedException e) 
            {
                e.printStackTrace();
            } 
        }
    }

    public static void main(String[] args)
    {
        Main app = new Main();
        app.setBounds(50,50,600,400);
        app.setVisible(true);
    }
}    