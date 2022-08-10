# https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def __str__(self):
        return f"val: {self.val} l: {self.left} r: {self.right}"


class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        treetop = TreeNode(2, None, None)
        print(treetop)


sol1 = Solution().sortedArrayToBST([-10, -3, 0, 5, 9])
