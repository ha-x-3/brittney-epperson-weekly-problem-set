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
