import { Question } from "./Question";
import { Categories } from "./enums/Categories";
import { Complexity } from "./enums/Complexity";

export const mockQuestions: Question[] = [
  {
    id: "",
    title: "Reverse a String",
    description: `
Write a function that reverses a string. The input string is given as an array of characters \`s\`.  
You must do this by modifying the input array in-place with \`O(1)\` extra memory.

Example 1:  
Input: \`s = ["h","e","l","l","o"]\`  
Output: \`["o","l","l","e","h"]\`  

Example 2:  
Input: \`s = ["H","a","n","n","a","h"]\`  
Output: \`["h","a","n","n","a","H"]\`  

Constraints:
- \`1 <= s.length <= 105\`
- \`s[i]\` is a printable ASCII character.
      `,
    categories: [Categories.Strings, Categories.Algorithms],
    complexity: Complexity.Easy,
  },
  {
    id: "",
    title: "Linked List Cycle Detection",
    description: `
Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.  
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.  

Internally, \`pos\` is used to denote the index of the node that tail's next pointer is connected to. Note that \`pos\` is not passed as a parameter.  
Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.  

Example 1:  
![example1](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)  
Input: \`head = [3,2,0,-4], pos = 1\`   
Output: \`true\`  
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).  

Example 2:  
![example2](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)  
Input: \`head = [1,2], pos = 0\`  
Output: \`true\`  
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.  

Example 3:  
![example3](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)  
Input: \`head = [1], pos = -1\`  
Output: \`false\`  
Explanation: There is no cycle in the linked list.  

Constraints:  
- The number of the nodes in the list is in the range [0, 104].  
-  \`-10^5 <= Node.val <= 10^5\`  
- \`pos\` is -1 or a valid index in the linked-list.

Follow up: Can you solve it using \`O(1)\` (i.e. constant) memory?`,
    categories: [Categories.DataStructures, Categories.Algorithms],
    complexity: Complexity.Easy,
  },
];
