# https://leetcode.com/problems/regular-expression-matching/

class Solution:

    #     def find_all(self, a_str, sub) -> []:
    #         out = []

    #         i = 0
    #         while True:
    #             i = a_str.find(sub, i)
    #             if i == -1: return out
    #             out.append(i)
    #             i += len(sub) # use i += 1 to find overlapping matches

    def testStrings(self, p: str) -> []:

        print(self.find_all(p, '.'))

        return [p]

    def isMatch(self, s: str, p: str) -> bool:

        print(f's: {s} p: {p}')

        strings = self.testStrings(p)

        print(f'strings: {strings}')

        return False
