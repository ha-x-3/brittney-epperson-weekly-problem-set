/* 
LeetCode 125 - Valid Palindrome
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.
https://leetcode.com/problems/valid-palindrome/description/
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    //Initialize 2 pointers at beginning and end
    let left = 0;
    let right = s.length - 1;

    //Use while loop to compare characters
    while (left < right) {
        //Skip non-alphanumeric characters for left pointer
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        //Skip non-alphanumeric characters for the right pointer
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        //Compare characters - case-insensitive
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            //Characters don't match - not palindrome
            return false;
        }
        //Move pointers
        left++;
        right--;
    }
    //Loop has completed - is palindrome
    return true;
};

//Regex helper function - returns true is character is alphanumeric
function isAlphanumeric(char) {
    return /^[a-zA-Z0-9]$/.test(char);
}

console.log('isPalindrome1 ' + isPalindrome('A man, a plan, a canal: Panama'));
console.log('isPalindrome2 ' + isPalindrome('race a car'));
console.log('isPalindrome3 ' + isPalindrome(' ')); 