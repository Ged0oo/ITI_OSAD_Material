import java.util.*;

public class Main{
	static int CountOccuranceStringTockenizer(String input, String key){
		StringTokenizer words = new StringTokenizer(input);
		int count = 0;
		
		while(words.hasMoreTokens()){
			String curToken = words.nextToken();
			if(curToken.equals(key)) count++;
		}
		
		return count;
	}
	
	static int CountOcuuranceRegix(String input, String key){
		int count = 0;
		String words[] = input.split("\\s+");
		
		for(String word : words){
			if(word.equals(key)) count++;
		}
		
		return count;
	}
	
	static int  CountOcuuranceIndexOf(String input, String key){
		int count = 0, idx = 0;
		String words[] = input.split("\\s+");
		
		do{
			idx = input.indexOf(key, idx);
			if(idx != -1){
				idx += key.length();
				count++;
			}
		} while(idx != -1);
	
		return count;
	}
			
    static boolean isValidIP(String ip) {
        String ipPattern = "^(((25[0-5]|2[0-4]\\d)|(1\\d{2}|[1-9]?\\d))\\.){3}((25[0-5])|(2[0-4]\\d)|(1\\d{2})|([1-9]?\\d))$";
        return ip.matches(ipPattern);
    }

    static void TockenizeIP(String ip) {
        String parts[] = ip.split("\\.");
        for (String part : parts) System.out.println(part);
    }
	
	static public void main(String args[]){
		Scanner sc = new Scanner(System.in);
		
		String input = sc.nextLine();
		String key   = sc.nextLine();
		
		System.out.println(CountOcuuranceRegix(input, key));
		System.out.println(CountOccuranceStringTockenizer(input, key));
		System.out.println(CountOcuuranceIndexOf(input, key));
		
		String ip =  sc.nextLine();
		boolean ret = isValidIP(ip);
		if(ret == true) TockenizeIP(ip);
		else System.out.println("Wrong Formatted IP");
		
		sc.close();
	}
}