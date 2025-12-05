// javac ./*.java && java TaskOne 6 HelloWorld 4

public class TaskOne{
    static public void main(String args[]){
        System.out.println("Hello World");

        if(Integer.valueOf(args[0]) % 2 == 0) System.out.println(args[0] + " is Even Number");
        else System.out.println(args[0] + " is Odd Number");

        String val = args[1];
        int count = Integer.valueOf(args[2]);
        for(int i=0 ; i<count ; i++) System.out.println(val);
    }
}