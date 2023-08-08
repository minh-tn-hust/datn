const express = require("express");
const cors = require("cors");
var morgan = require('morgan')

require('dotenv').config();



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging request
app.use(morgan('combined'))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// ROUTES
app.get("/", (req, res) => {
    res.json({ message: "Welcome to minhtn3 authentication server" });
});
require('./src/routes/auth.routes')(app);


// DB CONNECT
const db = require("./src/models");
const Role = db.role;
const User = db.user;

async function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "mod"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
    let user = await User.create({
        username: "theOriginer",
        password: "$2a$08$VFOrclKrfAdSf0/1YcygaO/zNGzTgucUMwxIyyfPTy3j8XFQZDmUu",
        email: "admin@gmail.com"
    })
    user.setRoles([1, 2, 3]);
}

function connectDb() {
    setTimeout(() => {
        db.sequelize
            .sync({ force : true })
            .then(() => {
                console.log("SYNC DB DONE");
                initial();
            })
            .catch((error) => {
                console.log(error);
                console.log("RECONNECT TO DB");
                connectDb();
            });
    }, 2000)
}

connectDb();