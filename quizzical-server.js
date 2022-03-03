const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const auth = require('./middleware/auth');

dotenv.config( { path: './.env' } );

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieparser());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"));

//Register Code-----"--------------------------------------------||
app.get("/", (req, res) => {
    res.send("Hello from Nodejs");
    // res.render("http://localhost:3000/")
});

app.post("/register", async (req, res) => {
    console.log("Attempting to register");
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 8);

    // Add function to check if email already in use
    const otherUser = await User.find({ email: email});
    console.log(otherUser);

    if (otherUser.length > 0) {
        res.send("Sorry, that email is already in use");
    } else {
        await User.create(
            {
                name: name,
                email: email,
                password: hashedPassword
            }
        )
        res.send("User successfully registered");
    }
});

app.post("/results", async (req, res) => {
    console.log("Attempting to submit score and time");
    console.log(req.body);


    // Will need to update ID to refelect logged in user
    await User.findByIdAndUpdate(req.body._id, req.body);

    res.send(
        {
            message: "Score and time submitted",
            resultsSubmitted: true
        }
    );
})

app.get("/leaderboard", async (req, res) => {
    console.log("Retrieving leaderboard data");

    const allUsers = await User.find({ "score": { "$exists": true } }).sort({'score': -1, 'time': 1});
    // const allUsers = await User.find();
    res.send(allUsers);
})
//Register Code---------------------------------------------------||


//Login Code------------------------------------------------------||
app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', async (req,res) => {   

    const email = req.body.email;
    const password = req.body.password;


    const user = await User.find({ email: email });
    console.log( user );

    if( user.length > 0) {
        const isMatch = await bcrypt.compare(password, user[0].password)
        console.log( isMatch );
    
        if (isMatch) {

            const token = jwt.sign( {id: user[0]._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            console.log(token);

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions)

            res.send(
                {
                    message: "Login successful",
                    loggedIn: true
                }
            );
        } else {
            res.send(
                {
                    message: "Login unsuccessful",
                    loggedIn: false
                }
            );
        }
    } else {
        res.send(
            {
                message: "Login unsuccessful",
                loggedIn: false
            }
        );
    }
})

// app.get("/quiz", auth.isLoggedIn, (req,res) => {
//     console.log("Checking if user is logged in")
//     if(req.foundUser) {
//         console.log("User is logged in");
//         res.send(
//             {
//                 loggedIn: true,
//                 userId: req.userId,
//                 userName: req.foundUser.name
//             }
//         )
//     } else {
//         res.send("User is not logged in")
//     }
// });

app.get("/quiz", auth.isLoggedIn, (req,res) => {
    console.log("Checking if user is logged in")
    if(req.foundUser) {
        console.log("User is logged in");
        res.send(
            {
                loggedIn: true,
                userId: req.userId,
                userName: req.foundUser.name,
                userScore: req.foundUser.score,
                userTime: req.foundUser.time
            }
        )
    } else {
        res.send("User is not logged in")
    }
});


//Login Code------------------------------------------------------||

app.get('/logout', auth.logout, (req,res) => {
    console.log("inside logout page")
    res.send('User is logged out')
})


app.listen( 5000, () => {
    console.log("Server is running on port 5000");
});