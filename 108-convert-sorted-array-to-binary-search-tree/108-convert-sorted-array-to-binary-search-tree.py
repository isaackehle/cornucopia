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
import math
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


max_iter = None


class Solution:

    peak = None

    def setPeak(self, nums: List[int]):

        # print(f"------- nums: {nums}")

        sz = len(nums)
        mod = (sz % 2)
        ind = int((sz - mod)/2)
        # print(f"sz: {sz} mod: {mod} ind: {ind}")

        peak = TreeNode(nums[ind], None, None)

        lChunk = nums[0:ind]
        rChunk = nums[ind + 1: sz]

        # print(f"peak: {peak}")
        # print(f"lChunk: {lChunk}")
        # print(f"rChunk: {rChunk}")

        if len(lChunk) > 0:
            peak.left = self.setPeak(lChunk)

        if len(rChunk) > 0:
            peak.right = self.setPeak(rChunk)

        return peak

    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        run_count = 0

        self.peak = self.setPeak(nums)

        print(f"------- {self.peak}")

        return self.peak


def tree(node):
    l = "" if node.left == None else tree(node.left)
    r = "" if node.right == None else tree(node.right)

    filtered = " ".join(
        filter(lambda s: s != "", [l, "[" + str(node.val) + "]", r]))

    return f"({filtered})"


with open('108-testcases.json', 'r') as testfile_raw:
    testcases = json.load(testfile_raw)


for testcase in testcases:
    max_iter = testcase["max_iter"] if "max_iter" in testcase else None

    if max_iter == 0:
        continue

    data = testcase["data"]
    out = Solution().sortedArrayToBST(data)
    # print(f"data: {data}")
    print(f"out: {tree(out)}")

    if "expected" in testcase:
        print(f"expected: {testcase['expected']}")
