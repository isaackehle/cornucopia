# https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

'''
108. Convert Sorted Array to Binary Search Tree

Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

My Solution:

First solution was to jump to the middle and work a way outwards. However, for a real system, when adding a new node to the tree,
tree resorting will be needed. Therefore, process the nodes as they come in, regardless of order.

When inserting into the tree, be sure to only care about what the peak node can see.
'''


from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def __str__(self):
        strL = f"{self.left} " if self.left != None else ""
        strR = f" {self.right}" if self.right != None else ""
        return f"({strL}{self.val}{strR})"
    #     # return f"({self.left} -> {self.val} -> {self.right})"

    def summary(self):
        strL = f"{self.left.val} " if self.left != None else ""
        strR = f" {self.right.val}" if self.right != None else ""
        return f"({strL}{self.val}{strR})"

    def leftDepth(self) -> int:
        return 0 if self.left == None else self.left.depth()

    def rightDepth(self) -> int:
        return 0 if self.right == None else self.right.depth()

    def depth(self) -> int:
        lDepth = self.leftDepth()
        rDepth = self.rightDepth()
        dChildren = lDepth if lDepth > rDepth else rDepth

        return 1 + dChildren


class Solution:

    peak = None

    def rebalance(self, peak):
        newPeak = peak
        # print(f"rebalance: {peak}, {peak.leftDepth()} {peak.rightDepth()}")
        if peak.leftDepth() - peak.rightDepth() >= 2:
            newPeak = peak.left
            newPeak.right = peak
            newPeak.right.left = None

        if peak.rightDepth() - peak.leftDepth() >= 2:
            newPeak = peak.right
            newPeak.left = peak
            newPeak.left.right = None

        # print(f"rebalance: {peak}, {newPeak}")
        return newPeak

    def rotateLeft(self, peak):
        newPeak = peak.right
        peak.right = None

        if newPeak.left != None:
            peak.right = newPeak.left

        newPeak.left = peak
        peak = newPeak

        peak.left = self.rebalance(peak.left)
        return peak

    def rotateRight(self, peak):
        newPeak = peak.left
        peak.setLeftNone

        if newPeak.right != None:
            peak.left = newPeak.right

        newPeak.right = peak
        peak = newPeak

        peak.right = self.rebalance(peak.right)
        return peak

    def insert(self, peak, node):

        # decide
        lDepth = peak.leftDepth()
        rDepth = peak.rightDepth()

        # initial choice: if neither is populated, then
        choice = "left" if node.val < peak.val else "right"

        if (choice == "left" and peak.left == None):
            peak.left = node
            return peak

        if (choice == "right" and peak.right == None):
            peak.right = node
            return peak

        lNode = peak.left
        rNode = peak.right
        rVal = peak.right.val if peak.right != None else None
        lVal = peak.left.val if peak.left != None else None

        if rVal < node.val:
            if peak.left == None and peak.right != None:
                tmpR = peak.right
                peak = self.rotateLeft(peak)
                tmpR.right = node

            else:
                # print(f"insert right; {node.val} {peak}")
                if rDepth - lDepth == 1:
                    peak = self.rotateLeft(peak)
                elif rDepth - lDepth > 1:
                    print(f"--> what are we doing? {node.val} {peak}")

                peak.right = self.insert(peak.right, node)

            return peak

        if lVal > node.val:
            if peak.right == None and peak.left != None:
                tmpL = peak.left
                peak = self.rotateRight(peak)
                tmpL.left = node
            else:
                if lDepth - rDepth == 1:
                    peak = self.rotateRight(peak)
                elif lDepth - rDepth > 1:
                    print(f"--> what are we doing? {node.val} {peak}")

                peak.left = self.insert(peak.left, node)

            return peak

        print(
            f"do nothing node: {node} {lVal} -> {peak.val} -> {rVal}  l: {lDepth} r: {rDepth}")

        return peak

    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        for num in nums:
            # print(f"------- num: {num}")
            node = TreeNode(num, None, None)

            if self.peak == None:
                self.peak = node
                # print(f"set peak: {self.peak.val}")

            else:
                self.peak = self.insert(self.peak, node)

        return self.peak


# print(Solution().sortedArrayToBST([-10, -3, 0, 5, 9]))
# print(Solution().sortedArrayToBST([1, 3]))

out3 = Solution().sortedArrayToBST([0, 1, 2, 3, 4, 5, 6, 7])
exp3 = [4, 2, 6, 1, 3, 5, 7, 0]
print(out3)
print(exp3)
