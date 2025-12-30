# Maximum Depth of Binary Tree - Recursive Approach

## Overview
This code implements a recursive function to calculate the maximum depth (or height) of a binary tree. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Function Explanation

```cpp
int maxDepth(TreeNode *root){
    if(root == nullptr) return 0;
    int LeftLen = maxDepth(root->left);
    int RightLen = maxDepth(root->right);
    return (1 + max(LeftLen, RightLen));
}
```

### Step-by-Step Breakdown

1. **Base Case**: If the current node (`root`) is `nullptr`, return 0. This means we've reached the end of a branch (no more nodes).

2. **Recursive Calls**: 
   - Recursively calculate the depth of the left subtree: `maxDepth(root->left)`
   - Recursively calculate the depth of the right subtree: `maxDepth(root->right)`

3. **Combine Results**: 
   - Take the maximum of the left and right subtree depths
   - Add 1 (for the current node) to this maximum
   - Return the result

### How It Works

- The function traverses the entire tree recursively
- At each node, it computes the depth of both subtrees
- The depth at any node is 1 (itself) plus the maximum depth of its children
- Leaf nodes (nodes with no children) have a depth of 1

### Example

For a tree like:
```
    3
   / \
  9  20
    /  \
   15   7
```

- `maxDepth(3)` calls `maxDepth(9)` and `maxDepth(20)`
- `maxDepth(9)` returns 1 (leaf node)
- `maxDepth(20)` calls `maxDepth(15)` and `maxDepth(7)`, both return 1, so returns 2
- `maxDepth(3)` returns 1 + max(1, 2) = 3

### Time Complexity
- O(n) where n is the number of nodes in the tree
- Each node is visited exactly once

### Space Complexity
- O(h) where h is the height of the tree (worst case for skewed tree)
- Due to the recursion stack

This recursive approach is elegant and easy to understand, making it a great starting point for tree traversal problems.