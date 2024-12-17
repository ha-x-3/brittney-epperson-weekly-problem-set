/* 
LeetCode 242 - Valid Anagram
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
https://leetcode.com/problems/valid-anagram/
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    //If lengths are different, cannot be anagram
    if (s.length !== t.length) return false;

    //Create frequency map for letters in s
    const map = {};

    //Count frequency of letters in s
    for (let letter of s) {
        map[letter] = (map[letter] || 0) + 1
    }

    //Decrement frequencies in map for letters in t
    for (let letter of t) {
        //Letter not in map or frequency >= -1, cannot be anagram
        if (!map[letter]) return false;
        map[letter]--;
    }
    //Passes all checks, is anagram
    return true;
};

console.log('isAnagram1 ' + isAnagram(s = "anagram", t = "nagaram"));
console.log('isAnagram2 ' + isAnagram(s = 'rat', t = 'car'));

/* 
LeetCode 20 - Valid Parentheses
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
https://leetcode.com/problems/valid-parentheses/description/
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    //Create stack array to push and pop brackets
    const stack = [];
    //Create map of matching brackets
    const bracketMap = {
        ')':'(',
        '}':'{',
        ']':'['
    };
    //Loop thru each char of string s
    for (const char of s) {
        //Push opening brackets onto the stack, pop closing brackets off
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char ==='}' || char === ']') {
            //Pop top element from stack and check if it matches corresponding bracket of bracketMap
            if (stack.pop() !== bracketMap[char]) {
                //If bracket doesn't match, not valid - return false
                return false;
            }
        }
    }
    //Check if stack is empty, if yes - check is valid
    return stack.length === 0;
};

console.log('isValid1 ' + isValid(s = '()'));
console.log('isValid2 ' + isValid(s = '()[]{}'));
console.log('isValid3 ' + isValid(s = '(]'));
console.log('isValid4 ' + isValid(s = '([])'));

/* 
LeetCode 49 - Group Anagrams
Given an array of strings `strs`, group all anagrams together. You can return the answer in any order.
https://leetcode.com/problems/group-anagrams/
*/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    //Create anagram map
    const anagramMap = {};
    //Loop thru each string of strs
    for (const str of strs) {
        //Sort each string
        const sortedStr = str.split('').sort().join('');
        //If sorted string not in anagram map, create empty array for this group
        if (!anagramMap[sortedStr]) {
            anagramMap[sortedStr] = [];
        }
        //Add the original string to it anagram group
        anagramMap[sortedStr].push(str);
    }
    //Return array of values from anagramMap object
    
    return Object.values(anagramMap);
};

console.log(
	'groupAnagrams1 ' +
		groupAnagrams(strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
);
console.log(
    'groupAnagrams2 ' +
        groupAnagrams(strs = [""])
);
console.log('groupAnagrams3 ' + groupAnagrams(strs = ["a"]));

/* 
LeetCode 238 - Product of Array Except Self
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.
https://leetcode.com/problems/product-of-array-except-self/description/
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length; //Length of the array for loops
    const answer = new Array(n).fill(1); //Initialize answer array with all 1s

    //Calculate left products
    let left = 1; //Stores running product from left of index
    for (let i = 0; i < n; i++) {
        //Set current index in the answer array item
        answer[i] = left;
        //Update left product with the current number
        left *= nums[i];
    }

    //Calculate right products and multiply with left products
    let right = 1; //Stores running product from right of index
    for (let i = n - 1; i >= 0; i--) {
        //Multiply current answer array item with the right product
        answer[i] *= right;
        //Update right product with the current number
        right *= nums[i];
    }
    //Return computed answer array
    return answer;
};

console.log('productExceptSelf1 ' + productExceptSelf([1, 2, 3, 4]));
console.log('productExceptSelf2 ' + productExceptSelf([-1, 1, 0, -3, 3])); 

/* 
LeetCode 128 - Longest Consecutive Sequence
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.
https://leetcode.com/problems/longest-consecutive-sequence/description/
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    //Create a Set to store unique numbers for lookup
    const numSet = new Set(nums);
    //Variable to track longest sequence
    let longestStreak = 0;

    //Iterate thru numbers in array
    for (const num of numSet) {
        //Check if current number is start of sequence (set has no num - 1)
        if (!numSet.has(num - 1)) {
            //Start sequence from current number
            let currentNum = num;
            //Track length of current streak
            let currentStreak = 1;

            //Repeatedly check for consecutive numbers in the sequence
            while (numSet.has(currentNum + 1)) {
                //Move to the next number in sequence
                currentNum += 1;
                //Increment length of current sequence
                currentStreak += 1;
            }

            //Update longest streak with current if current is longer
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    //Return longest streak
    return longestStreak;
};

console.log('longestConsecutive1 ' + longestConsecutive([100, 4, 200, 1, 3, 2]));
console.log(
	'longestConsecutive2 ' + longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])
);
