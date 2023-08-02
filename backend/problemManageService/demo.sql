
INSERT INTO problems (
    hardLevel, 
    problemName, 
    description, 
    statement, 
    input, 
    output, 
    createdAt, 
    updatedAt, 
    ownerId
) VALUES (
    "hard", 
    "Test Performance", 
    "Test Performance Description", 
    "Test Performance Statement", 
    "Test Performance Input", 
    "Test Performance Output", 
    "2023-07-10 10:00:00", 
    "2023-07-10 10:00:00", 
    1
);

INSERT INTO testcases (
    input, 
    output, 
    explaination, 
    problemId, 
    createdAt, 
    updatedAt, 
    ownerId
) VALUES (
    '38\n', 
    '2\n', 
    "The single-digit sum of the number '38' is 2 (3 + 8 = 11, 1 + 1 = 2).", 
    12, 
    "2023-07-10 10:00:00", 
    "2023-07-10 10:00:00", 
    1
);