const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ChineseWord = require('./models/chineseWord');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const auth = require('./middleware/auth');
const cors = require('cors');

dotenv.config({ path: './.env'});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cookieparser());
app.use(cors({ credentials: true }));

// Connect DB 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error)
    }
};

connectDB();

// // ROUTES

// REGISTER

app.post('/api/register', async (req, res) => {
    console.log("Attempting to register");
    console.log(req.body);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 8);

    // Add function to check if email already in use
    const otherUser = await User.find({ username: username });
    console.log(otherUser);

    if (otherUser.length > 0) {
        res.send("Sorry, that username is already in use");
    } else {
        await User.create(
            {
                username: username,
                email: email,
                password: hashedPassword
            }
        )
        res.send("User successfully registered");
    }
});

// LOGIN

app.post('/api/login', async (req,res) => {   

    const username = req.body.username;
    const password = req.body.password;


    const user = await User.find({ username: username });
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
                    loggedIn: true,
                    username: username
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

// LOGOUT

app.get('/api/logout', auth.logout, (req,res) => {
    console.log("inside logout page")
    res.send('User is logged out')
})

// CHECK IF LOGGED IN

app.get('/api/logged_in', auth.isLoggedIn, (req,res) => {
    console.log("Checking if user is logged in")
    if(req.foundUser) {
        console.log("User is logged in");
        res.send(
            {
                username: req.foundUser.username,
                email: req.foundUser.email
            }
        )
    } else {
        res.send("User is not logged in")
    }
});


// VOCAB - Add & retrieve

app.get('/api/vocab/zh/:id', async (req, res) => {
    const username = req.params.id;
    try {
        const foundWords = await ChineseWord.find({username: username});
        res.json({
            foundWords
        })
    } catch (error) {
        console.log(error);
    }
});

// ADD CHINESE WORD

app.post('/api/vocab/zh', async (req, res) => {
    console.log(req.body);

    const chinese = req.body.chinese;
    const characters = req.body.characters;
    const readings = req.body.readings;
    const pinyin = req.body.pinyin;
    const tones = req.body.tones;
    const english = req.body.english;
    const username = req.body.user;

    try {
        const existingTango = await ChineseWord.find({ chinese, username });

        if (existingTango.length > 0) {
            res.json({
                message: "Sorry, you've already saved this word!"
            })
        } else {
            await ChineseWord.create(
                {
                    chinese,
                    characters,
                    readings,
                    pinyin,
                    tones,
                    english,
                    username
                }
            );
    
            res.json({
                message: "New vocab added"
            })
        }
    } catch (error) {
        res.json({
            message: "This vocab was not added"
        })
    }   
});

// DELETE CHINESE WORD

app.delete('/api/vocab/zh/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req);
    try {
        await ChineseWord.findByIdAndDelete({_id: id});
        console.log('Attempting to delete vocab');
        res.json({
            message:'Vocab deleted'
        })
    } catch (error) {
        console.log(error);
    } 
})

// UPDATE CHINESE WORD

app.patch('/api/vocab/zh/:id', async(req, res) => {
    const id = req.params.id;
    try {
        await ChineseWord.findByIdAndUpdate(id, req.body);
        console.log('Attempting to update vocab');
        res.json({
            message:'Vocab updated'
        })
    } catch (error) {
        console.log(error);
    }
});

// First route to check if working
app.get('/', (req, res) => {
    res.send('Hello from Node.js')
});

// Specifying port to run on. React runs on 3000 by default, so choose other to avoid conflict.
app.listen( process.env.PORT || 4999, () => {
    console.log('Server is running');
});
