const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const JapaneseWord = require('./models/japaneseWord');
const JapaneseSentence = require('./models/japaneseSentence');
const JapaneseCorrection = require('./models/japaneseCorrection');
const ChineseWord = require('./models/chineseWord');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const auth = require('./middleware/auth');

dotenv.config({ path: './.env'});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cookieparser());

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
    const otherUser = await User.find({ email: email});
    console.log(otherUser);

    if (otherUser.length > 0) {
        res.send("Sorry, that email is already in use");
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

// app.get('/api/vocab/ja', async (req, res) => {
//     try {
//         const foundWords = await JapaneseWord.find();
//         res.json({
//             foundWords
//         })
//     } catch (error) {
//         console.log(error);
//     }
// });

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

// ADD JAPANESE WORD

// app.post('/api/vocab/ja', async (req, res) => {
//     console.log(req.body);

//     const lang = req.params.lang;
//     console.log({lang});

//     const japanese = req.body.japanese;
//     const reading = req.body.reading;
//     const english = req.body.english;

//     try {
//         const existingTango = await JapaneseWord.find({ japanese });

//         if (existingTango.length > 0) {
//             res.json({
//                 message: 'Sorry, that word already exists in the database'
//             })
//         } else {
//             await JapaneseWord.create(
//                 {
//                     japanese,
//                     reading,
//                     english
//                 }
//             );
    
//             res.json({
//                 message: "New vocab added"
//             })
//         }
//     } catch (error) {
//         res.json({
//             message: "This vocab was not added"
//         })
//     }   
// });

// ADD CHINESE WORD

app.post('/api/vocab/zh', async (req, res) => {
    console.log(req.body);

    const chinese = req.body.chinese;
    const characters = req.body.characters;
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

// VOCAB - Delete & edit

app.delete('/api/deletevocab/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req);
    try {
        await JapaneseWord.findByIdAndDelete({_id: id});
        console.log('Attempting to delete vocab');
        res.json({
            message:'Vocab deleted'
        })
    } catch (error) {
        console.log(error);
    } 
});

app.post('/api/updatevocab/:id', async(req, res) => {
    const id = req.params.id;
    try {
        await JapaneseWord.findByIdAndUpdate(id, req.body);
    } catch (error) {
        console.log(error);
    }
});

// SENTENCES - Add & retrieve

app.get('/api/sentences', async (req, res) => {
    try {
        const foundSentences = await JapaneseSentence.find();
        res.json({
            foundSentences
        })
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/sentences', async (req, res) => {
    console.log(req.body);

    const japanese = req.body.japanese;
    const english = req.body.english;

    try {
        const existingSentences = await JapaneseSentence.find({ japanese });

        if (existingSentences.length > 0) {
            res.json({
                message: 'Sorry, that sentence already exists in the database'
            })
        } else {
            await JapaneseSentence.create(
                {
                    japanese,
                    english
                }
            );
    
            res.json({
                message: "New sentence added"
            })
        }
    } catch (error) {
        res.json({
            message: "This sentence was not added"
        })
    }   
});

// SENTENCES - Delete & edit

app.delete('/api/deletesentence/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req);
    try {
        await JapaneseSentence.findByIdAndDelete({_id: id});
        console.log('Attempting to delete sentence');
        res.json({
            message:'Sentence deleted'
        })
    } catch (error) {
        console.log(error);
    } 
});

app.post('/api/updatesentence/:id', async(req, res) => {
    const id = req.params.id;
    try {
        await JapaneseSentence.findByIdAndUpdate(id, req.body);
    } catch (error) {
        console.log(error);
    }
});

// CORRECTIONS - Add & retrieve

app.get('/api/corrections/:id', async (req, res) => {
    const sentenceID = req.params.id;
    try {
        const foundCorrections = await JapaneseCorrection.find({sentenceID});
        res.json({
            foundCorrections
        })
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/corrections', async (req, res) => {
    console.log(req.body);

    const sentenceID = req.body.sentenceID;
    const correction = req.body.correction;

    try {
        const existingCorrections = await JapaneseSentence.find({ sentenceID, correction });

        if (existingCorrections.length > 0) {
            res.json({
                message: 'Sorry, an identical correction for that sentence already exists in the database'
            })
        } else {
            await JapaneseCorrection.create(
                {
                    sentenceID,
                    correction
                }
            );
            res.json({
                message: "New correction added"
            })
        }
    } catch (error) {
        res.json({
            message: "This correction was not added"
        })
    }   
});

// CORRECTIONS - Delete & edit

app.delete('/api/deletecorrection/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req);
    try {
        await JapaneseCorrection.findByIdAndDelete({_id: id});
        console.log('Attempting to delete sentence');
        res.json({
            message:'Sentence deleted'
        })
    } catch (error) {
        console.log(error);
    } 
});

app.post('/api/updatesentence/:id', async(req, res) => {
    const id = req.params.id;
    try {
        await JapaneseSentence.findByIdAndUpdate(id, req.body);
    } catch (error) {
        console.log(error);
    }
});

// First route to check if working
app.get('/', (req, res) => {
    res.send('Hello from Node.js')
});

// Specifying port to run on. React runs on 3000 by default, so choose other to avoid conflict.
app.listen( 5000, () => {
    console.log('Server is running on port 5000');
});
