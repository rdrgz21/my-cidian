const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const JapaneseWord = require('./models/japaneseWord');
const JapaneseSentence = require('./models/japaneseSentence');
const JapaneseCorrection = require('./models/japaneseCorrection');

dotenv.config({ path: './.env'});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

// Connect DB 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error)
    }
};

connectDB();

// ROUTES

// VOCAB - Add & retrieve

app.get('/api/vocab', async (req, res) => {
    try {
        const foundWords = await JapaneseWord.find();
        res.json({
            foundWords
        })
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/vocab', async (req, res) => {
    console.log(req.body);

    const japanese = req.body.japanese;
    const reading = req.body.reading;
    const english = req.body.english;

    try {
        const existingTango = await JapaneseWord.find({ japanese });

        if (existingTango.length > 0) {
            res.json({
                message: 'Sorry, that word already exists in the database'
            })
        } else {
            await JapaneseWord.create(
                {
                    japanese,
                    reading,
                    english
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
