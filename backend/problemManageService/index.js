const rpcServer = require("./src/grpc/index");
const createTestPerformanceProblem = require("./test_performance");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(morgan("combined"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to minhtn3 authentication server" });
});
require("./src/routes/problem.routes")(app);
require("./src/routes/testcase.routes")(app);

// DB CONNECT
const db = require("./src/models");
const Categories = db.category;

function connectDb() {
    setTimeout(() => {
        db.sequelize
            .sync({ alter : true })
            .then(() => {
                console.log("SYNC DB DONE");
                initial();
            })
            .catch((error) => {
                console.log("RECONNECT TO DB");
                connectDb();
            });
    }, 2000)
}

connectDb();


async function initial() {
  const categories = [
    "array",
    "string",
    "hashtable",
    "dynamicprogramming",
    "math",
    "greedy",
    "sorting",
    "depthfirstsearch",
    "binarysearch",
    "database",
    "breadthfirstsearch",
    "tree",
    "matrix",
    "twopointers",
    "binarytree",
    "bitmanipulation",
    "heap",
    "stack",
    "prefixsum",
    "graph",
    "design",
    "simulation",
    "counting",
    "backtracking",
    "slidingwindow",
    "unionfind",
    "linkedlist",
    "orderedset",
    "monotonicstack",
    "enumeration",
    "recursion",
    "trie",
    "divideandconquer",
    "binarysearchtree",
    "bitmask",
    "queue",
    "numbertheory",
    "segmenttree",
    "memoization",
    "geometry",
    "topologicalsort",
    "binaryindexedtree",
    "hashfunction",
    "gametheory",
    "shortestpath",
    "combinatorics",
    "datastream",
    "interactive",
    "stringmatching",
    "rollinghash",
    "brainteaser",
    "randomized",
    "monotonicqueue",
    "mergesort",
    "iterator",
    "concurrency",
    "doublylinkedlist",
    "probabilityandstatistics",
    "quickselect",
    "bucketsort",
    "suffixarray",
    "minimumspanningtree",
    "countingsort",
    "shell",
    "linesweep",
    "reservoirsampling",
    "euleriancircuit",
    "radixsort",
    "stronglyconnectedcomponent",
    "rejectionsampling",
    "biconnectedcomponent",
  ];
  for (const category of categories) {
    await Categories.create({
      type: category,
      ownerId: 0,
    });
  }
  setTimeout(function() {
    createTestPerformanceProblem();
  }, 10000)
}

rpcServer.start(50051);
