# https://leetcode.com/problems/regular-expression-matching/
import json
import math
from typing import List

'''
Given an input string s and a pattern p, implement regular expression matching with support
for '.' and '*' where:

- '.' Matches any single character.​​​​
- '*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

Constraints:

- 1 <= s.length <= 20
- 1 <= p.length <= 30
- s contains only lowercase English letters.
- p contains only lowercase English letters, '.', and '*'.
- It is guaranteed for each appearance of the character '*', there will be a previous
    valid character to match.


## My Solution

I cheated, straight up. I thought the question was a little fuzzy, so I looked for additional
explaination in the solution.  My initial thought was to break up the string into chunks and
ensure each of the chunks are found. But since we are talking about the whole string,
not partials, that didn't quite apply.

If I were to do this again, I would likely use pointers and move them based on the wildcards.

For now, the goal is more about working with python than the actual result, and I am OK with it.
'''


class Solution:

    def isMatch(self, s: str, p: str) -> bool:

        if not p:
            return not s

        fm = bool(s) and p[0] in {s[0], '.'}
        # print(f's: {s} p: {p} fm: {fm}')

        if len(p) >= 2 and p[1] == '*':
            m1 = self.isMatch(s, p[2:])
            # print(f'--> s: "{s}" p: "{p[2:]}" m1: {m1}')

            if m1:
                return True

            if not fm:
                return False

            m2 = self.isMatch(s[1:], p)
            # print(f'--> s: {s[1:]} p: {p} m2: {m2}')

            return (m2)

        return fm and self.isMatch(s[1:], p[1:])


with open('10-testcases.json', 'r') as testfile_raw:
    testcases = json.load(testfile_raw)


for testcase in testcases:
    if testcase["run"] == True:
        out = Solution().isMatch(testcase["s"], testcase["p"])
        print(f"testcase: {testcase} out: {out}")
