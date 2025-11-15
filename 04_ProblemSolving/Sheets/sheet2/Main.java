

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

    public static void main(String[] args) {

    }
}
