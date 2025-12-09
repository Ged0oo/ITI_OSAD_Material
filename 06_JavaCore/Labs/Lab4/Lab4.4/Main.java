import java.util.Scanner;

public class Main {
    public static String test(String str1, String str2, BetterString bs){
        return bs.check(str1, str2);
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String str1 = sc.nextLine();
        String str2 = sc.nextLine();

        String ret = test(str1, str2, (s1, s2) -> {
            if(s1.length() > s2.length()) return s1;
            return s2;
        });

        System.out.println(ret);
    }
}
