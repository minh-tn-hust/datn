const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to minhtn3 code executing server"});
});
require('./routes/submission.routes')(app);


// DB CONNECT
const db = require("./models/index");
const Submission = db.submission;



function connectDb() {
    setTimeout(() => {
        db.sequelize
            .sync({ alter: true })
            .then(() => {
                console.log("SYNC DB DONE");
            })
            .catch((error) => {
                console.log("RECONNECT TO DB");
                connectDb();
            });
    }, 2000)
}

connectDb();
