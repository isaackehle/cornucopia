# https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/

'''
108. Convert Sorted Array to Binary Search Tree

Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

My Solution:

First solution was to jump to the middle and work a way outwards. However, for a real system, when adding a new node to the tree,
tree resorting will be needed. Therefore, process the nodes as they come in, regardless of order.

When inserting into the tree, be sure to only care about what the peak node can see.

# Phase 2
I had a working answer, but the runtime execution was terrible. Sometimes you have to be open to tossing and idea, start over from
scratch, and move along.

This new goal is to be totally recursive, with any 'rebalancing' taking place at the bottom tree.

I've noticed that on my mac, I am getting this error: `RecursionError: maximum recursion depth exceeded in comparison`.  This tells me
that recursion is not the best option.  Instead, I would need to find the next open good spot and keep filling the tree, flipping back
and forth.

I think overall this is a good solution with recursion. The issue is that the output I am generating with this method is not lining
with the expected output of leetcode.  I think the solution works (except for the recursion issue above), but I am going to
implement a solution similar to leetcode's solution.
'''


import json
from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def __str__(self):
        strL = f"{self.left.val} " if self.left != None else ""
        strR = f" {self.right.val}" if self.right != None else ""
        return f"({strL}*{self.val}{strR})"

    def tree(self):
        l = "" if self.left == None else self.left.tree()
        r = "" if self.right == None else self.right.tree()

        filtered = " ".join(
            filter(lambda s: s != "", [l, "[" + str(self.val) + "]", r]))

        return f"({filtered})"

    def childCnt(self):
        cnt = 0
        if self.left != None:
            cnt += 1
        if self.right != None:
            cnt += 1

        return cnt

    def leftDepth(self) -> int:
        if self.left == None:
            return 0

        return 2 if self.left.childCnt() > 0 else 1

    def rightDepth(self) -> int:
        if self.right == None:
            return 0

        return 2 if self.right.childCnt() > 0 else 1


max_iter = None


class Solution:

    peak = None

    def rotateLeft(self, peak):
        pfx = "rotateLeft;"
        oldPeak = peak
        newPeak = peak.right
        oldPeak.right = None

        if newPeak.left != None:
            oldPeak.right = newPeak.left

        newPeak.left = oldPeak
        return newPeak

    currDepth = 0

    def insert(self, peak, node):
        self.currDepth += 1
        pfx = f"insert val:{node.val}, ({self.currDepth})"

        if peak == None:
            # print(f"{pfx} self")
            self.currDepth -= 1
            return node

        cc = peak.childCnt()
        lcc = 0 if peak.left == None else peak.left.childCnt()
        rcc = 0 if peak.right == None else peak.right.childCnt()
        dStr = f"cc: {cc} lcc: {lcc} rcc: {rcc}"
        # print(f"{pfx}; {dStr}; {peak}")

        if cc == 0:
            # print(f"{pfx}; [add to left (no children)] {peak}")
            node.left = peak
            peak = node
            # print(f"{pfx}; [added to left (no children)] {peak}")
            self.currDepth -= 1
            return peak

        if cc == 1:
            # print(f"{pfx}; [insert right (one child)] {peak}")
            peak.right = self.insert(peak.right, node)
            # print(f"{pfx}; [inserted right (one child)] peak -> {peak}")
            self.currDepth -= 1
            return peak

        # two children.

        if lcc == 0 and rcc == 0:
            # print(f"{pfx}; [rotate first] {peak}")
            peak = self.rotateLeft(peak)
            peak.right = self.insert(peak.right, node)
            # print(f"{pfx}; [added to right] {peak}")
            self.currDepth -= 1
            return peak

        if lcc == 1 and rcc == 1:
            # print(f"{pfx}; [rotate first] {peak}")
            peak = self.rotateLeft(peak)

            # print(f"{pfx}; [add to left] {peak}")
            peak.right = self.insert(peak.right, node)
            # print(f"{pfx}; [added to right] {peak}")
            self.currDepth -= 1
            return peak

        # insert to the right
        # print(f"{pfx}; [insert right (default)] {peak.tree()}")
        peak.right = self.insert(peak.right, node)
        # print(f"{pfx}; peak -> {peak.tree()}")

        self.currDepth -= 1

        return peak

    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        run_count = 0

        for num in nums:
            # print(f"------- {num}, {run_count}")
            self.peak = self.insert(self.peak, TreeNode(num, None, None))
            # print(f"------- self.peak: {self.peak.tree()}")

            if max_iter:
                run_count += 1
                if run_count >= max_iter:
                    break

        return self.peak


with open('108-testcases.json', 'r') as testfile_raw:
    testcases = json.load(testfile_raw)


for testcase in testcases:
    max_iter = testcase["max_iter"] if "max_iter" in testcase else None

    if max_iter == 0:
        continue

    data = testcase["data"]
    out = Solution().sortedArrayToBST(data)
    # print(f"data: {data}")
    print(f"out: {out.tree()}")

    if "expected" in testcase:
        print(f"expected: {testcase['expected']}")
