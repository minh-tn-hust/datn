let problems = [{
    "hardLevel": "medium",
    "problemName": "Problem 1",
    "description": "John has a graph with $n$ vertices. He is curious how many cycles exist in his graph.",
    "statement": "A **cycle** is a path in the graph that starts and ends at the same vertex. John wants to calculate the number of cycles. Help him or state that it is impossible.",
    "input": "The first line contains a single integer $n(2 \\leq n \\leq 10^5)$ — the number of vertices in the graph. The next $n−1$ rows contain integers $v_i$ and $u_i$ $(1 \\leq v_i,u_i \\leq n)$ — the numbers of vertices that the $i-th$ edge connects.",
    "output": "Print the number of cycles in the graph. If it is impossible to calculate, print $−1$."
},{
    "hardLevel": "hard",
    "problemName": "Problem 2",
    "description": "Alice has a tree with $n$ vertices. She wonders how many paths can be found within the tree.",
    "statement": "A **path** is a sequence of vertices where each pair of consecutive vertices is connected by an edge. Alice wants to calculate the number of paths. Help her or state that it is impossible.",
    "input": "The first line contains a single integer $n(2 \\leq n \\leq 10^5)$ — the number of vertices in the tree. The next $n−1$ rows contain integers $v_i$ and $u_i$ $(1 \\leq v_i,u_i \\leq n)$ — the numbers of vertices that the $i-th$ edge connects.",
    "output": "Print the number of paths in the tree. If it is impossible to calculate, print $−1$."
},{
    "hardLevel": "easy",
    "problemName": "Problem 3",
    "description": "Bob has a sequence of $n$ numbers. He wants to find the maximum sum of any subsequence.",
    "statement": "A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements. Bob wants to find the subsequence with the maximum sum. Help him or state that it is impossible.",
    "input": "The first line contains a single integer $n(1 \\leq n \\leq 10^5)$ — the number of numbers in the sequence. The next line contains $n$ integers $a_i$ $(−10^5 \\leq a_i \\leq 10^5)$ — the numbers in the sequence.",
    "output": "Print the maximum sum of any subsequence. If it is impossible to calculate, print $−1$."
},{
    "hardLevel": "medium",
    "problemName": "Number Multiplication",
    "description": "Given two positive integers, find the product of the two numbers.",
    "statement": "Find the product of two given numbers.",
    "input": "Two integers A and B (1 ≤ A, B ≤ 10^3)",
    "output": "Output a single integer - the product of A and B."
},{
    "hardLevel": "hard",
    "problemName": "Longest Increasing Subsequence",
    "description": "Given a sequence of N numbers, find the length of the longest increasing subsequence.",
    "statement": "Find the length of the longest increasing subsequence.",
    "input": "A single line containing N integers (1 ≤ N ≤ 10^5)",
    "output": "Output a single integer - the length of the longest increasing subsequence."
},{
    "hardLevel": "easy",
    "problemName": "Sum of Digits",
    "description": "Given a positive integer, find the sum of its digits.",
    "statement": "Find the sum of the digits of a given number.",
    "input": "A single integer N (1 ≤ N ≤ 10^9)",
    "output": "Output a single integer - the sum of the digits of N."
},{
    "hardLevel": "medium",
    "problemName": "String Reversal",
    "description": "Given a string, you need to reverse it and print the reversed string.",
    "statement": "Reverse the given string.",
    "input": "A single string S (1 ≤ |S| ≤ 10^5)",
    "output": "Print the reversed string."
},{
    "hardLevel": "hard",
    "problemName": "Minimum Path Sum",
    "description": "Given a grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.",
    "statement": "Find the minimum path sum from top left to bottom right.",
    "input": "First line contains two integers M and N (1 ≤ M, N ≤ 100). Each of the next M lines contains N integers representing the grid.",
    "output": "Output a single integer - the minimum path sum from top left to bottom right."
},{
    "hardLevel": "easy",
    "problemName": "Palindrome Checker",
    "description": "Given a string, check whether it is a palindrome or not.",
    "statement": "Check whether the given string is a palindrome or not.",
    "input": "A single string S (1 ≤ |S| ≤ 10^5)",
    "output": "Print 'YES' if the string is a palindrome, 'NO' otherwise."
},{
    "hardLevel": "medium",
    "problemName": "Count Vowels",
    "description": "Given a string, your task is to count the number of vowels in the string.",
    "statement": "Count the number of vowels in the given string.",
    "input": "A single string S (1 ≤ |S| ≤ 10^5). It consists of lowercase and uppercase letters from the English alphabet.",
    "output": "Print a single integer - the number of vowels in the string."
},{
    "hardLevel": "hard",
    "problemName": "Maximal Square",
    "description": "Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.",
    "statement": "Find the largest square containing only 1's and return its area.",
    "input": "First line contains two integers M and N (1 ≤ M, N ≤ 100). Each of the next M lines contains N integers (0 or 1) representing the matrix.",
    "output": "Output a single integer - the area of the largest square containing only 1's."
},{
    "hardLevel": "easy",
    "problemName": "Digit Sum",
    "description": "Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.",
    "statement": "Find the single-digit sum of the given non-negative integer.",
    "input": "A single non-negative integer num (0 ≤ num ≤ 10^9).",
    "output": "Print a single integer - the single-digit sum of the number."
}]

let testcases = [{
    "input" : "4\n1 2\n2 3\n3 4\n",
    "output": "0\n",
    "explaination": "In this case, the graph is a simple line (1-2-3-4) without any cycle.",
    "problemId": "1"
},{
    "input" : "4\n1 2\n2 3\n3 1\n3 4\n",
    "output": "4\n",
    "explaination": "The tree has 4 paths which are 1-2, 2-3, 3-1, and 3-4.",
    "problemId": "2"
}, {
    "input" : "5\n1 -2 3 -4 5\n",
    "output": "9\n",
    "explaination": "The subsequence with the maximum sum is [1, 3, 5], and the sum is 1 + 3 + 5 = 9.",
    "problemId": "3"
}, {
    "input" : "10\n20\n",
    "output": "200\n",
    "explaination": "The product of 10 and 20 is 200.",
    "problemId": "4"
},{
    "input" : "5\n3 4 5 2 8\n",
    "output": "4\n",
    "explaination": "The longest increasing subsequence is [3, 4, 5, 8].",
    "problemId": "5"
},{
    "input" : "12345\n",
    "output": "15\n",
    "explaination": "The sum of the digits of 12345 is 1+2+3+4+5 = 15.",
    "problemId": "6"
},{
    "input" : "HelloWorld\n",
    "output": "dlroWolleH\n",
    "explaination": "The reversed string of 'HelloWorld' is 'dlroWolleH'.",
    "problemId": "7"
},{
    "input" : "3 3\n1 3 1\n1 5 1\n4 2 1\n",
    "output": "7\n",
    "explaination": "The minimum path sum is 7 (1 -> 3 -> 1 -> 1 -> 1).",
    "problemId": "8"
},{
    "input" : "madam\n",
    "output": "YES\n",
    "explaination": "The string 'madam' is a palindrome.",
    "problemId": "9"
},{
    "input" : "HelloWorld\n",
    "output": "3\n",
    "explaination": "The string 'HelloWorld' contains 3 vowels: 'e', 'o', 'o'.",
    "problemId": "10"
},{
    "input" : "4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0\n",
    "output": "4\n",
    "explaination": "The largest square containing only 1's has an area of 4 (2x2 square).",
    "problemId": "11"
},{
    "input" : "38\n",
    "output": "2\n",
    "explaination": "The single-digit sum of the number '38' is 2 (3 + 8 = 11, 1 + 1 = 2).",
    "problemId": "12"
}]


function genAddProblemSql(problem) {
  return `INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("${problem["hardLevel"]}", "${problem["problemName"]}", "${problem["description"]}", "${problem["statement"]}", "${problem["input"]}", "${problem["output"]}", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 0);`
}

function genAddTestcaseSql(testcase) {
  return `INSERT INTO testcase(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('${testcase["input"]}', '${testcase["output"]}', "${testcase["explaination"]}", ${testcase["problemId"]}, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 0);`
}


let totalScript = "";
for (let i = 0; i < problems.length; i++) {
  let problem = problems[i];
  let testcase = testcases[i];
  totalScript += genAddProblemSql(problem);
  totalScript += genAddTestcaseSql(testcase);
  totalScript += "\n\n";
}

console.log(JSON.stringify(totalScript));

