// https://leetcode.com/problems/add-two-numbers/submissions/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Safely return the next node
 * @param {ListNode} n
 * @return {ListNode | null}
 */
const nextStep = (n) => {
  if (!n) return null;
  if (!n.next) return null;
  return n.next;
};

/**
 * NOTE: This function destroys the input arrays
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  let out = new ListNode();
  let curr = out;
  let n1 = l1;
  let n2 = l2;
  let c = 0;
  //   let cNode = null;

  while (n1 || n2) {
    let v1 = n1 ? n1.val : 0;
    let v2 = n2 ? n2.val : 0;

    const oldC = c;

    // Do the addition
    curr.val = v1 + v2 + c;

    // Calculate the carry
    c = curr.val >= 10 ? 1 : 0;

    // clip to the single digit
    curr.val = c ? curr.val - 10 : curr.val;

    // Increment the pointers
    n1 = nextStep(n1);
    n2 = nextStep(n2);

    // Pick an active pointer (don't create some new one)
    if (n1) {
      curr.next = n1;
      curr = curr.next;
    } else if (n2) {
      curr.next = n2;
      curr = curr.next;
    } else curr.next = null;

    // Save an extra carry node if needed at the end
    // if (n1 && n2 && !cNode) cNode = n2;
  }

  // console.log({curr, out})

  if (c) {
    // if (cNode) {
    //     curr.next = cNode;
    //     cNode.val = 1;
    //     cNode.next = null;
    // } else {
    curr.next = new ListNode(1);
    // }
  }

  return out;
};
