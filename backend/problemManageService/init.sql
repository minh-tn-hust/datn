SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'problems' AND TABLE_SCHEMA = 'problemdb';

CREATE TABLE IF NOT EXISTS `problems` (`id` INTEGER NOT NULL auto_increment , `problemName` TEXT, `hardLevel` ENUM('easy', 'medium', 'hard'), `description` TEXT, `statement` TEXT, `input` TEXT, `output` TEXT, `constraint` TEXT, `ownerId` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `problems`;

SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'testcases' AND TABLE_SCHEMA = 'problemdb';
CREATE TABLE IF NOT EXISTS `testcases` (`id` INTEGER NOT NULL auto_increment , `explaination` TEXT, `isExample` TINYINT(1), `input` LONGTEXT, `output` LONGTEXT, `ownerId` INTEGER, `problemId` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`problemId`) REFERENCES `problems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `testcases`;
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'categories' AND TABLE_SCHEMA = 'problemdb';
CREATE TABLE IF NOT EXISTS `categories` (`id` INTEGER NOT NULL auto_increment , `type` TEXT, `ownerId` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `categories`;
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'languageSupports' AND TABLE_SCHEMA = 'problemdb';
CREATE TABLE IF NOT EXISTS `languageSupports` (`id` INTEGER NOT NULL auto_increment , `type` TEXT, `memoryLimited` INTEGER, `timeLimited` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `problemId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`problemId`) REFERENCES `problems` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `languageSupports`;
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'problem_categories' AND TABLE_SCHEMA = 'problemdb';
CREATE TABLE IF NOT EXISTS `problem_categories` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `categoryId` INTEGER , `problemId` INTEGER , PRIMARY KEY (`categoryId`, `problemId`), FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`problemId`) REFERENCES `problems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("medium", "Problem 1", "John has a graph with $n$ vertices. He is curious how many cycles exist in his graph.", "A **cycle** is a path in the graph that starts and ends at the same vertex. John wants to calculate the number of cycles. Help him or state that it is impossible.", "The first line contains a single integer $n(2 \\leq n \\leq 10^5)$ — the number of vertices in the graph. The next $n−1$ rows contain integers $v_i$ and $u_i$ $(1 \\leq v_i,u_i \\leq n)$ — the numbers of vertices that the $i-th$ edge connects.", "Print the number of cycles in the graph. If it is impossible to calculate, print $−1$.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('4\n1 2\n2 3\n3 4\n', '0\n', "In this case, the graph is a simple line (1-2-3-4) without any cycle.", 1, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 1, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 1, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 1, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("hard", "Problem 2", "Alice has a tree with $n$ vertices. She wonders how many paths can be found within the tree.", "A **path** is a sequence of vertices where each pair of consecutive vertices is connected by an edge. Alice wants to calculate the number of paths. Help her or state that it is impossible.", "The first line contains a single integer $n(2 \\leq n \\leq 10^5)$ — the number of vertices in the tree. The next $n−1$ rows contain integers $v_i$ and $u_i$ $(1 \\leq v_i,u_i \\leq n)$ — the numbers of vertices that the $i-th$ edge connects.", "Print the number of paths in the tree. If it is impossible to calculate, print $−1$.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('4\n1 2\n2 3\n3 1\n3 4\n', '4\n', "The tree has 4 paths which are 1-2, 2-3, 3-1, and 3-4.", 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 2, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 2, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 2, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("easy", "Problem 3", "Bob has a sequence of $n$ numbers. He wants to find the maximum sum of any subsequence.", "A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements. Bob wants to find the subsequence with the maximum sum. Help him or state that it is impossible.", "The first line contains a single integer $n(1 \\leq n \\leq 10^5)$ — the number of numbers in the sequence. The next line contains $n$ integers $a_i$ $(−10^5 \\leq a_i \\leq 10^5)$ — the numbers in the sequence.", "Print the maximum sum of any subsequence. If it is impossible to calculate, print $−1$.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('5\n1 -2 3 -4 5\n', '9\n', "The subsequence with the maximum sum is [1, 3, 5], and the sum is 1 + 3 + 5 = 9.", 3, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 3, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 3, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 3, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("medium", "Number Multiplication", "Given two positive integers, find the product of the two numbers.", "Find the product of two given numbers.", "Two integers A and B (1 ≤ A, B ≤ 10^3)", "Output a single integer - the product of A and B.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('10\n20\n', '200\n', "The product of 10 and 20 is 200.", 4, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 4, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 4, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 4, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("hard", "Longest Increasing Subsequence", "Given a sequence of N numbers, find the length of the longest increasing subsequence.", "Find the length of the longest increasing subsequence.", "A single line containing N integers (1 ≤ N ≤ 10^5)", "Output a single integer - the length of the longest increasing subsequence.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('5\n3 4 5 2 8\n', '4\n', "The longest increasing subsequence is [3, 4, 5, 8].", 5, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 5, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 5, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 5, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("easy", "Sum of Digits", "Given a positive integer, find the sum of its digits.", "Find the sum of the digits of a given number.", "A single integer N (1 ≤ N ≤ 10^9)", "Output a single integer - the sum of the digits of N.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('12345\n', '15\n', "The sum of the digits of 12345 is 1+2+3+4+5 = 15.", 6, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 6, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 6, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 6, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("medium", "String Reversal", "Given a string, you need to reverse it and print the reversed string.", "Reverse the given string.", "A single string S (1 ≤ |S| ≤ 10^5)", "Print the reversed string.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('HelloWorld\n', 'dlroWolleH\n', "The reversed string of 'HelloWorld' is 'dlroWolleH'.", 7, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 7, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 7, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 7, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("hard", "Minimum Path Sum", "Given a grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.", "Find the minimum path sum from top left to bottom right.", "First line contains two integers M and N (1 ≤ M, N ≤ 100). Each of the next M lines contains N integers representing the grid.", "Output a single integer - the minimum path sum from top left to bottom right.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('3 3\n1 3 1\n1 5 1\n4 2 1\n', '7\n', "The minimum path sum is 7 (1 -> 3 -> 1 -> 1 -> 1).", 8, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 8, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 8, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 8, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("easy", "Palindrome Checker", "Given a string, check whether it is a palindrome or not.", "Check whether the given string is a palindrome or not.", "A single string S (1 ≤ |S| ≤ 10^5)", "Print 'YES' if the string is a palindrome, 'NO' otherwise.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('madam\n', 'YES\n', "The string 'madam' is a palindrome.", 9, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 9, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 9, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 9, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("medium", "Count Vowels", "Given a string, your task is to count the number of vowels in the string.", "Count the number of vowels in the given string.", "A single string S (1 ≤ |S| ≤ 10^5). It consists of lowercase and uppercase letters from the English alphabet.", "Print a single integer - the number of vowels in the string.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('HelloWorld\n', '3\n', "The string 'HelloWorld' contains 3 vowels: 'e', 'o', 'o'.", 10, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 10, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 10, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 10, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("hard", "Maximal Square", "Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.", "Find the largest square containing only 1's and return its area.", "First line contains two integers M and N (1 ≤ M, N ≤ 100). Each of the next M lines contains N integers (0 or 1) representing the matrix.", "Output a single integer - the area of the largest square containing only 1's.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('4 5\n1 0 1 0 0\n1 0 1 1 1\n1 1 1 1 1\n1 0 0 1 0\n', '4\n', "The largest square containing only 1's has an area of 4 (2x2 square).", 11, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 11, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 11, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 11, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");


INSERT INTO problems (hardLevel, problemName, description, statement, input, output, createdAt, updatedAt, ownerId) VALUES ("easy", "Digit Sum", "Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.", "Find the single-digit sum of the given non-negative integer.", "A single non-negative integer num (0 ≤ num ≤ 10^9).", "Print a single integer - the single-digit sum of the number.", "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO testcases(input, output, explaination, problemId, createdAt, updatedAt, ownerId) VALUES ('38\n', '2\n', "The single-digit sum of the number '38' is 2 (3 + 8 = 11, 1 + 1 = 2).", 12, "2023-07-10 10:00:00", "2023-07-10 10:00:00", 1);
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('cpp', 12, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('java', 12, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");
INSERT INTO languageSupports (type, problemId, memoryLimited, timeLimited, createdAt, updatedAt) VALUES ('golang', 12, 128, 2, "2023-07-10 10:00:00", "2023-07-10 10:00:00");

