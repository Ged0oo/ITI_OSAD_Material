import java.util.Scanner;

public class Main{  
    public static void main(String[] args) {
        boolean flag = true;
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        
        for(char ch : str.toCharArray()){
            if((Character.isLetter(ch) == false) && (ch != ' ')){
                flag = false; break;
            }
        }

        if(flag) System.out.println("True: This was an Alphabit.");
        else System.out.println("False: This wasn't an Alphabit.");
    }
}