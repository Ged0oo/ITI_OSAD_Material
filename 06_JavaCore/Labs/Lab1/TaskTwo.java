import java.util.Arrays;
import java.util.Random;

public class TaskTwo {
    static int[] arr;
    static int minVal = Integer.MAX_VALUE;
    static int maxVal = Integer.MIN_VALUE;

    static void traverse() {
        for (int num : arr) {
            minVal = Math.min(minVal, num);
            maxVal = Math.max(maxVal, num);
        }
    }

    static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;

            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }

        return -1;
    }

    public static void main(String[] args) {
        arr = new int[1000];
        Random rand = new Random();
        for (int i = 0; i < 1000; i++) arr[i] = rand.nextInt(1000);


        // Linear Traversal Test
        long start1 = System.nanoTime();
        traverse();
        long end1 = System.nanoTime();
        System.out.println("Max Number : " + maxVal);
        System.out.println("Min Number : " + minVal);
        System.out.println("Linear scan time : " + (end1 - start1)/1000 + " us");


        // Binary Search TEST
        Arrays.sort(arr);
        int target = arr[rand.nextInt(1000)];
        long start2 = System.nanoTime();
        int index = binarySearch(arr, target);
        long end2 = System.nanoTime();
        System.out.println("\nSearching for: " + target);
        System.out.println("Found at index: " + index);
        System.out.println("Binary search time : " + (end2 - start2)/1000 + " us");
    }
}
