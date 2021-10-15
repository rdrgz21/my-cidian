import React, {useState} from 'react';
import axios from 'axios';
import AddChineseCSS from "./AddChinese.module.css";
import AddZhEn from './AddZhEn/AddZhEn';
import AddReadings from './AddReadings/AddReadings';
import AddTones from './AddTones/AddTones';
import Review from './Review/Review';

export const AddChinese = () => {

    const [chinese, setChinese] = useState('');
    const [meaning, setMeaning] = useState('');
    const [characters, setCharacters] = useState([]);
    const [readings, setReadings] = useState([]);
    const [tones, setTones] = useState([]);
    const [pinyin, setPinyin] = useState([]);
    const [stage, setStage] = useState(1);

    const nextStage = () => {
        if (stage < 4) {
            setStage(stage + 1);
        } else {
            setStage(1);
            setMessage('');
        }
    };
    
    const previousStage = () => setStage(stage - 1);

    const createBaseArrays = (string) => {
        const splitCharacters = string.split('');
        const emptyStringArray = new Array(splitCharacters.length).fill('');
        const emptyNumberArray = new Array(splitCharacters.length).fill(0);
        setCharacters(splitCharacters);
        setReadings(emptyStringArray);
        setPinyin(emptyStringArray);
        setTones(emptyNumberArray);
    }

    const generateComponentByStage = stage => {
        switch (stage) {
            case 1:
                return <AddZhEn setChinese={setChinese} setMeaning={setMeaning} createBaseArrays={createBaseArrays} nextStage={nextStage} />;
            case 2:
                return <AddReadings savedCharacters={characters} savedReadings={readings} setReadings={setReadings} nextStage={nextStage} />
            case 3:
                return <AddTones savedCharacters={characters} savedReadings={readings} savedTones={tones} setTones={setTones} savedPinyin={pinyin} setPinyin={setPinyin} nextStage={nextStage} />
            case 4:
                return <Review savedCharacters={characters} savedPinyin={pinyin} savedMeaning={meaning} savedTones={tones} message={message} handleSubmit={handleSubmit} />
            default:
                return null;
        }
    }

    // Send to DB

    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newVocab = {
            chinese: chinese,
            characters: characters,
            pinyin: pinyin,
            english: meaning
        };

        console.log(newVocab);
        
        const response = await axios.post('/api/vocab/zh', newVocab, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        setMessage(response.data.message);
    };

    return (
        <div className={AddChineseCSS.container}>
            {stage > 1 &&
                (<div className={AddChineseCSS.buttonContainer}>
                    <button onClick={previousStage}>Back</button>
                    <button onClick={nextStage}>Next</button>
                </div>)
            }
            {generateComponentByStage(stage)}
       </div>
    )
};

export default AddChinese;
