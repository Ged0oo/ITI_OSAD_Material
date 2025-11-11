/*
    https://docs.google.com/spreadsheets/d/16U-w5_3QUhLDTjqJlykHw2oe4znBOhB6HnAJy139ZrQ/edit?gid=0#gid=0
*/

import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}
 
public class Main {
    static public boolean hasDuplicate(int[] nums) {
        HashSet<Integer> mySet = new HashSet<>();
        for(int num:nums){
            if(mySet.contains(num)) return true;
            else mySet.add(num);
        }
        return false;
    }

    static public boolean isAnagram(String s, String t) {
        if(s.length() != t.length()) 
            return false;

        char[] arr1 = s.toCharArray();
        char[] arr2 = t.toCharArray();

        Arrays.sort(arr1);
        Arrays.sort(arr2);

        return Arrays.equals(arr1, arr2);
    }

    static public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> mp = new HashMap<>();
        
        for(int i=0 ; i<nums.length ; i++){
            int diff = target - nums[i];
            if(mp.containsKey(diff)) {
                return new int[] {i, mp.get(diff)};
            }
            mp.put(nums[i], i);
        }
        
        return new int[] {-1, -1};
    }

    static public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        
        for(char ch : s.toCharArray()){
            if(ch == '[' || ch == '(' || ch == '{') st.push(ch);
            else {
                if(st.empty()) return false;
                char tp = st.pop();
                if(ch == ')' && tp != '(') return false;
                if(ch == '}' && tp != '{') return false;
                if(ch == ']' && tp != '[') return false;
            }
        }

        return st.isEmpty();
    }
    
    static public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1, mid;

        while(left <= right) {
            mid = left + (right - left)/2;
            if(nums[mid] == target) 
                return mid;
            else if(nums[mid] > target) 
                right = mid - 1;
            else 
                left = mid + 1;
        }

        return -1;
    }
    
    static public boolean areOccurrencesEqual(String s) {
        int[] freq = new int[26];
        for(char ch : s.toCharArray()) freq[ch-'a']++;

        int i=0;
        while(freq[i] == 0) i++;
        int prev = freq[i];

        for(i = i+1 ; i<26 ; i++) {
            if(freq[i] == 0) continue;
            if(freq[i] != prev) return false;
            prev = freq[i];
        }

        return true;
    }

    static public int lengthOfLastWord(String s) {
        String[] words = s.split(" ");
        return words[words.length - 1].length();
    }

    static int removeElement(int[] nums, int val) {
        int index = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) nums[index++] = nums[i];
        }
        return index;
    }

    static public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m-1, j = n-1, k = m+n-1;
        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];
            else nums1[k--] = nums2[j--];
        }
    }

    static public int maxProfit(int[] prices) {
        int maxProfit = 0, minPrice = Integer.MAX_VALUE;
        for(int price : prices) {
            minPrice = Math.min(price, minPrice);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }

    static public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length, mid;

        while(left <= right){
            mid = left + (right - left)/2;
            if(nums[mid] == target) return mid;
            else if(nums[mid] > target) right = mid - 1;
            else left = mid + 1;
        }

        return left;
    }

    static public int singleNumber(int[] nums) {
        int ret = 0;
        for(int i=0 ; i<nums.length ; i++) ret ^= nums[i];
        return ret;
    }

    static public boolean hasCycle(ListNode head) {      
        ListNode slow = head, fast = head;
        while(fast != null && fast.next != null){
            slow = slow.next;
            fast = fast.next.next;
            if(slow == fast) return true;
        }

        return false;
    }

    static public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if (list1 == null) return list2;
        
        if (list2 == null) return list1;

        if (list1.val <= list2.val) {
            list1.next = mergeTwoLists(list1.next, list2);
            return list1;
        } 
        else {
            list2.next = mergeTwoLists(list1, list2.next);
            return list2;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // System.out.println(hasDuplicate(new int[] {1, 2, 3, 3}));
        // System.out.println(isAnagram("racecar", "carrace"));
        // System.out.println(Arrays.toString(twoSum(new int[] {3, 4, 5, 6}, 7)));
        // System.out.println(isValid("([{}])"));
        // System.out.println(search(new int[] {-1,0,2,4,6,8}, 4));
        // System.out.println(areOccurrencesEqual("abacbc"));
        // System.out.println(lengthOfLastWord("   fly me   to   the moon  "));
        // System.out.println(removeElement(new int[] {0,1,2,2,3,0,4,2}, 2));
        // System.out.println(maxProfit(new int[] {7,6,4,3,1}));
        // System.out.println(searchInsert(new int[] {1,3,5,6}, 2));
    }
}
