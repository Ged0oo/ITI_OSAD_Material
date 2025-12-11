import java.util.*;

public class MyDictionary {

    TreeMap<Character, TreeSet<String>> dict;

    public MyDictionary() { dict = new TreeMap<>(); }

    public void addWord(String word) {
        if (word == null || word.isEmpty()) return;
        char key = word.toUpperCase().charAt(0);
        TreeSet<String> wordsSet = dict.getOrDefault(key, new TreeSet<>());
        wordsSet.add(word);
        dict.put(key, wordsSet);
    }

    public void printDict(){
        for(Character ch:dict.keySet()) printCharList(ch);
    }

    public void printCharList(char ch) {
        char key = Character.toUpperCase(ch);
        Set<String> set = dict.get(key);

        if (set == null || set.isEmpty()) {
            System.out.println("No words found starting with '" + key + "'.");
            return;
        }

        System.out.println("\n--- Words starting with '" + key + "' ---");
        for (String word : set) System.out.println(word);
        System.out.println("------------------------------------");
    }
}