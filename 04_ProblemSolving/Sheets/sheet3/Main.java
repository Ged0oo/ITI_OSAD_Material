/*
	https://docs.google.com/spreadsheets/d/1JMUf2zisFsokylaK8AtjmF5NkhVRjga5H6OZctcnpGg/edit?gid=0#gid=0
*/

import java.util.*;

public class Main {
	public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m-1, j = n-1, k = m+n-1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }

    static public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for(int num : nums){
            if(set.contains(num)) return true;
            set.add(num);
        }
        return false;
    }
	
    static public boolean isAnagram(String s, String t) {
        char[] str1 = s.toCharArray();
        char[] str2 = t.toCharArray();
        Arrays.sort(str1);
        Arrays.sort(str2);
        return Arrays.equals(str1, str2);
    }
   
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
		sc.close();
    }
}
