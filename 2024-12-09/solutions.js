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