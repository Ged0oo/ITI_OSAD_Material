

/*
 * https://docs.google.com/spreadsheets/d/1pH6g6TrQR3v8X0JCEL3MZ5F0ZjU5P41L6IG2KBtDLdU/edit?gid=0#gid=0
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}
 
public class Main {
    static public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode prev = null;
        while (slow != null) {
            ListNode next = slow.next;
            slow.next = prev;
            prev = slow;
            slow = next;
        }

        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) return false;
            left = left.next;
            right = right.next;
        }

        return true;
    }


    static public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }   
        
        return slow;
    }

    public ListNode swapNodes(ListNode head, int k) {
        ListNode first = head, second = head, fast = head;

        for (int i = 1; i < k; i++) fast = fast.next;
        first = fast;

        while (fast.next != null) {
            fast = fast.next;
            second = second.next;
        }

        int temp = first.val;
        first.val = second.val;
        second.val = temp;

        return head;
    }

    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) return head;
        ListNode temp = head;

        while (temp != null) {
            if (temp.next != null && temp.val == temp.next.val) {
                temp.next = temp.next.next;
            }
            else temp = temp.next;
        }

        return head;
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
    
    
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> ret = new ArrayList<>(numRows);
        
        for(int i=0 ; i<numRows ; i++){
            List<Integer> row = new ArrayList<>(i + 1);
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) row.add(1);
                else row.add(ret.get(i - 1).get(j - 1) + ret.get(i - 1).get(j));
            }
            ret.add(row);
        }   

        return ret;
    }
    
    public int searchInsert(int[] nums, int target) {
        int right = nums.length - 1, left = 0, mid;
        while(left <= right) {
            mid = left + (right - left)/2;
            if(nums[mid] == target) return mid;
            else if(target > nums[mid]) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }    
    
    public List<Integer> getRow(int rowIndex) {
        List<Integer> res = new ArrayList<>();

        res.add(1);
        long prev = 1;
        
        for (int k = 1; k <= rowIndex; k++) {
            long next_val = prev * (rowIndex - k + 1) / k;
            res.add((int) next_val);
            prev = next_val;
        }
        
        return res;
    }
    
	static Map<Character, Integer> romanMap = new HashMap<>(Map.of(
		'I', 1,
		'V', 5,
		'X', 10,
		'L', 50,
		'C', 100,
		'D', 500,
		'M', 1000
	));

	static public int romanToInt(String s) {
		int sum = 0, cur = 0, prev = 0;
		for(char ch : s.toCharArray()){
			cur = romanMap.get(ch);
			if(cur > prev) sum += cur - (2*prev);
			else sum += cur;
			prev = cur;
		}
		return sum;
	}
    
    static public String longestCommonPrefix(String[] strs) {
        if(strs == null || strs.length == 0) return "";

		Arrays.sort(strs);
		
		String first = strs[0], last = strs[strs.length - 1];
		
		int i=0;
		while (i<first.length() && i<last.length() && first.charAt(i) == last.charAt(i)) i++;

		return first.substring(0, i);
    }
	
	static public String addBinary(String a, String b) {
		StringBuilder ret = new StringBuilder();
		int l1 = a.length()-1, l2 = b.length()-1, carry = 0;

		while(l1>=0 || l2>=0 || carry>0){
			int sum = carry;
			if(l1 >= 0) sum += a.charAt(l1--) - '0';
			if(l2 >= 0) sum += b.charAt(l2--) - '0';
			ret.insert(0, (sum%2));
			carry = sum/2;
		}

		return ret.toString();
    }
	
	public int finalValueAfterOperations(String[] operations) {
        int x = 0;
        for(String op : operations){
            if(op.charAt(1) == '+') x++;
            else x--;
        }
        return x;
    }
    
    public int minimumMoves(String s) {
        int i=0, move=0;

        while(i < s.length()){
            if(s.charAt(i) == 'X'){
                i += 3;
                move++;
            }
            else i++;
        }

        return move;
    }
	
	static public boolean isPalindrome(int x) {
        String num = String.valueOf(x);
        return num.equals(new StringBuilder(num).reverse().toString());
    }
	
	public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode temp = new ListNode(0);
        ListNode current = temp;
        int carry = 0;

        while (l1 != null || l2 != null || carry > 0) {
            int v1 = (l1 != null) ? l1.val : 0;
            int v2 = (l2 != null) ? l2.val : 0;

            int sum = v1 + v2 + carry;
            carry = sum / 10;
            current.next = new ListNode(sum % 10);
            
            current = current.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }

        return temp.next;
    }
      
    public static void main(String[] args) {

    }
}
