/* 
LeetCode #217 - Contains Duplicates
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
https://leetcode.com/problems/contains-duplicate/description/
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    //Initialize an empty Set to track unique values
    let set = new Set();

    //Loop thru each num of nums in array
    for (let num of nums) {
        //Check if number exists in set already
        if (set.has(num)) {
            //Number is duplicate in set, return true
            return true;
        }
        //Number not in set, add to set for future loop iterations
        set.add(num);
    }

    //Loops have completed with duplicate - return false
    return false;
};

console.log(containsDuplicate([1,2,3,1]));
console.log(containsDuplicate([1,2,3,4]));
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]));

/* 
LeetCode #1 - Two Sum
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.
https://leetcode.com/problems/two-sum/description/
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    //Initialize a Map to store numbers and their indices
    let map = new Map();

    //Loop thru array of integers
    for (let i = 0; i < nums.length; i++) {
        //Calulate the complement number (numB) needed to reach the target
        let numB = target - nums[i];

        //Check if numB is already in the Map
        if (map.has(numB)) {
            //If found, return the indices of numB and the current number
            return [map.get(numB), i];
        }

        //Otherwise, store the current number and its index in the Map
        map.set(nums[i], i);
    }
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));

/* 
LeetCode #347 - Top K Frequent Elements
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
https://leetcode.com/problems/top-k-frequent-elements/description/
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    //Create a Map to store the frequency of each number
    let frequencyMap = new Map();

    //Iterate thru array and populate the frequency map
    for (let num of nums) {
        //Update the frequency of the current number or default to 0 if not present
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    //Create bucket array where index represents frequency
    let buckets = new Array(nums.length + 1).fill().map(() => []);
    //Fill buckets based on frequency
    for (let [num, freq] of frequencyMap) {
        //Push each number into bucket of corresponding frequency
        buckets[freq].push(num);
    }

    let result = []; //To hold output array
    //Loop thru buckets from highest frequency to lowest
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        //Add a copy of all numbers in current bucket to the result
        result.push(...buckets[i]);
    }

    //Return the first 'k' element from the result (this is the top frequency)
    return result.slice(0, k);
};

console.log(topKFrequent([1,1,1,2,2,3], 2));
console.log(topKFrequent([1], 1));

/*
NeetCode150 List - Encode and Decode Strings 
Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings. Implement encode and decode.
*/

class Solution {
	/**
	 * @param {string[]} strs
	 * @returns {string}
	 */
	encode(strs) {
        //Map each string to its encoded form ("<length>#<string>") and join them together
		return strs.map((str) => `${str.length}#${str}`).join('');
	}

	/**
	 * @param {string} str
	 * @returns {string[]}
	 */
	decode(str) {
		let result = [];
		let i = 0;

        //Loop through encoded string
		while (i < str.length) {
			//Find delimiter '#'
			let j = i;
			while (str[j] !== '#') {
				j++;
			}

			//Get length of current string (slice substring before #)
			let length = parseInt(str.slice(i, j));

			//Get actual string using length and push string into result array
			let string = str.slice(j + 1, j + 1 + length);
			result.push(string);

			//Move index to start of the next encoded string
			i = j + 1 + length;
		}
		return result;
	}
}

let solution = new Solution();
let encoded1 = solution.encode(['neet', 'code', 'love', 'you']);
console.log(solution.decode(encoded1));

let encoded2 = solution.encode(["we","say",":","yes"]);
console.log(solution.decode(encoded2));

/* 
LeetCode #36 - Valid Sudoku
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note: A Sudoku board (partially filled) could be valid but is not necessarily solvable. Only the filled cells need to be validated according to the mentioned rules.
*/

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    //Object to store seen values for rows, columns, and 3x3 sub-boxes
    const seen = { rows: {}, columns: {}, boxes: {} };

    //Loop thru each cell in the board
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = board[row][col];
            
            //Continue thru empty square
            if (value === ".") continue; 

            //Generate 3x3 box index using row and column indices / 3, rounding down
            const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

            //Initialize new Set for rows, columns, and boxes if not already created
            if (!seen.rows[row]) seen.rows[row] = new Set();
            if (!seen.columns[col]) seen.columns[col] = new Set();
            if (!seen.boxes[boxIndex]) seen.boxes[boxIndex] = new Set();

            //Check for duplicates
            if (
                seen.rows[row].has(value) ||
                seen.columns[col].has(value) ||
                seen.boxes[boxIndex].has(value)
            ) {
                //Duplicate found, board is invalid
                return false;
            }

            //Add value to the respect sets
            seen.rows[row].add(value);
            seen.columns[col].add(value);
            seen.boxes[boxIndex].add(value);
            
        }
    }
    //No duplicates found, board is valid
    return true;
};

let board1 = [
	['5', '3', '.', '.', '7', '.', '.', '.', '.'],
	['6', '.', '.', '1', '9', '5', '.', '.', '.'],
	['.', '9', '8', '.', '.', '.', '.', '6', '.'],
	['8', '.', '.', '.', '6', '.', '.', '.', '3'],
	['4', '.', '.', '8', '.', '3', '.', '.', '1'],
	['7', '.', '.', '.', '2', '.', '.', '.', '6'],
	['.', '6', '.', '.', '.', '.', '2', '8', '.'],
	['.', '.', '.', '4', '1', '9', '.', '.', '5'],
	['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

console.log(isValidSudoku(board1));

let board2 = [
	['8', '3', '.', '.', '7', '.', '.', '.', '.'],
	['6', '.', '.', '1', '9', '5', '.', '.', '.'],
	['.', '9', '8', '.', '.', '.', '.', '6', '.'],
	['8', '.', '.', '.', '6', '.', '.', '.', '3'],
	['4', '.', '.', '8', '.', '3', '.', '.', '1'],
	['7', '.', '.', '.', '2', '.', '.', '.', '6'],
	['.', '6', '.', '.', '.', '.', '2', '8', '.'],
	['.', '.', '.', '4', '1', '9', '.', '.', '5'],
	['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

console.log(isValidSudoku(board2));
