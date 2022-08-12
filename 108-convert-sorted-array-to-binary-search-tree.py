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

    # def __str__(self):
    #     # return f"({self.left} -> {self.val} -> {self.right})"
    #     return f"({self.left},{self.val},{self.right})"

    def setLeft(self, node) -> None:
        self.left = node

    def setRight(self, node) -> None:
        self.right = node

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

    def insert(self, peak, node):

        # decide
        lDepth = peak.leftDepth()
        rDepth = peak.rightDepth()

        # initial choice: if neither is populated, then
        choice = "left" if node.val < peak.val else "right"

        lNode = peak.left
        rNode = peak.right

        if (choice == "left" and lNode == None):
            # print("adding to left")
            peak.setLeft(node)
            # print(f"added to left: peak: {peak}")
            return peak

        if (choice == "right" and rNode == None):
            # print("adding to right")
            peak.setRight(node)
            # print(f"added to right: peak: {peak}")
            return peak

        # rotate left and set to the right?
        rVal = rNode.val if rNode != None else None
        lVal = lNode.val if lNode != None else None

        # print(
        #     f"** node.val: {node.val} {lVal} -> {peak.val} -> {rVal}  --  balance: l: {lDepth} r: {rDepth}")
        # print(f"** peak: {peak}")

        if rVal < node.val:
            if lNode == None and rNode != None:
                # print(f"rotate left; node: {node} peak: {peak}")
                rNode.left = peak
                peak.right = None
                peak.left = None
                rNode.right = node
                peak = rNode
                # print(f"rotated left; peak {peak}")
            else:
                # print(f"insert right; {node.val} peak: {peak}")

                if (rDepth - lDepth == 1):
                    # print(f"rotate left (2); node: {node} peak: {peak}")
                    rNode.left = peak
                    peak.right = None
                    peak = rNode
                    rNode = peak.right
                    # print(f"rotated left (2); peak {peak}")

                # print(f"inserting right; peak: {rNode.val}")

                peak.right = self.insert(rNode, node)
                # print(f"inserted right; peak: {peak}")

            return peak

        if lVal > node.val:
            if rNode == None and lNode != None:
                # print(f"rotate right; node: {node} peak: {peak}")
                lNode.right = peak
                peak.right = None
                peak.left = None
                lNode.left = node
                peak = lNode
                # print(f"rotated right; peak {peak}")
            else:
                # print(f"insert left; {node.val} {peak}")

                if (lDepth - rDepth == 1):
                    # print(f"rotate right (2); node: {node} peak: {peak}")
                    lNode.right = peak
                    peak.left = None
                    peak = lNode
                    lNode = peak.left
                    # print(f"rotated right (2); peak {peak}")

                peak.left = self.insert(lNode, node)
                # print(f"inserted left; peak: {peak}")

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

print(Solution().sortedArrayToBST([0, 1, 2, 3, 4, 5, 6, 7]))
