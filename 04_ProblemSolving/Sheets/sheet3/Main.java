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
	
    public int missingNumber(int[] nums) {
        int n = nums.length, ans = 0;
        for (int i = 1; i <= n; i++) ans ^= i;
        for (int i = 0; i < nums.length; i++) ans ^= nums[i];
        return ans;
    }
	
    static public char findTheDifference(String s, String t) {
        int xor = 0;
        for (char c : s.toCharArray()) xor ^= c;
        for (char c : t.toCharArray()) xor ^= c;
        return (char) xor;
    }
	
    static public int arrayPairSum(int[] nums) {
        int sum = 0;
        Arrays.sort(nums);
        for(int i=0 ; i<nums.length ; i+= 2) sum += nums[i];
        return sum;
    }
	
	static public int[] intersection(int[] nums1, int[] nums2) {
        HashSet<Integer> set = new HashSet<>();
        for (int n : nums1) set.add(n);

        return Arrays.stream(nums2)
                    .filter(set::contains)
                    .distinct()
                    .toArray();
    }

    public int[] smallerNumbersThanCurrent(int[] nums) {
        TreeMap<Integer, Integer> map = new TreeMap<>();
        for(int num : nums) map.put(num, map.getOrDefault(num, 0) + 1);

        int pref = 0;
        Map<Integer, Integer> st = new HashMap<>();
        for(Map.Entry<Integer, Integer> entry : map.entrySet()){
            st.put(entry.getKey(), pref);
            pref += entry.getValue();
        }

        int[] ret = new int[nums.length];
        for(int i=0 ; i<nums.length ; i++){
            ret[i] = st.get(nums[i]);
        }

        return ret;
    }
	
	public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            if (minHeap.size() < k) minHeap.add(num);
            else if (num > minHeap.peek()) {
                minHeap.poll();
                minHeap.add(num);
            }
        }
        return minHeap.peek();
    }
	
	public int[][] reconstructQueue(int[][] people) {
        Arrays.sort(people, (a, b) -> {
            if (a[0] != b[0]) return b[0] - a[0];
            else return a[1] - b[1];
        });

        List<int[]> queue = new ArrayList<>();
        for (int[] person : people) queue.add(person[1], person);

        return queue.toArray(new int[people.length][2]);
    }

    static public int leastInterval(char[] tasks, int n) {
        HashMap<Character, Integer> mp = new HashMap<>();

        for(char ch:tasks) mp.put(ch, mp.getOrDefault(ch, 0)+1);

        return 0;
    }
	
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
		sc.close();
    }
}
